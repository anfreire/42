import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  GameHelper,
  GameListItem,
  GameResume,
  GameResumeDialog,
  useFullScreen,
  useGame,
} from "../..";
import { useSocket } from "../../../../common/Socket";
import { useUser } from "../../../User";
import { useComponents } from "../../../../common/Components";
import { useSpring, animated, to } from "react-spring";
import { useTheme as useMyTheme } from "../../../../common/Theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CustomActions } from "../../utils/game.types";
import CustomAnnoucementAnimation from "./customAnnoucement.animation";
import PlayerInfoStack from "./playersInfo.stack";

export default function GameBoxContent() {
  const myTheme = useMyTheme();
  const [countdown, setCountdown] = useState(3);
  const [status, setStatus] = useState<"START" | "NEW_ROUND" | "END">(
    "NEW_ROUND"
  );
  const [leftUser, setLeftUser] = useState<{
    username: string;
    avatar: string;
  }>({ username: "", avatar: "" });
  const [rightUser, setRightUser] = useState<{
    username: string;
    avatar: string;
  }>({ username: "", avatar: "" });
  const [leftPoints, setLeftPoints] = useState(0);
  const [rightPoints, setRightPoints] = useState(0);
  const [resume, setResume] = useState<GameResume>({} as GameResume);
  const [action, setAction] = useState<CustomActions>("NONE");
  const fullscreen = useFullScreen();
  const socket = useSocket();
  const theme = useTheme();
  const game = useGame();
  const user = useUser();
  const components = useComponents();
  const [stackProps, setStackProps] = useSpring(() => ({
    opacity: 1,
    config: { duration: 1000 },
  }));
  const [ballPos, setBallPos] = useSpring(() => ({
    x: 50,
    y: 50,
    config: { duration: 1000 / 60 },
  }));
  const [rightPaddlePos, setRightPaddlePos] = useSpring(() => ({
    y: 50,
    config: { duration: 1000 / 60 },
  }));
  const [leftPaddlePos, setLeftPaddlePos] = useSpring(() => ({
    y: 50,
    config: { duration: 1000 / 60 },
  }));

  useEffect(() => {
    GameHelper.connect(
      socket.socket,
      (game.currGame as GameListItem).id,
      user,
      game,
      {
        setBallPos,
        setRightPaddlePos,
        setLeftPaddlePos,
        setCountdown,
        setStatus,
        setLeftPoints,
        setRightPoints,
        setResume,
        setAction,
        setLeftUser,
        setRightUser,
      }
    );
    if (game.isWatching || game.isReconnecting) setStatus("START");

    return () => {
      GameHelper.disconnect(
        socket.socket,
        (game.currGame as GameListItem).id,
        user,
        game
      );
      game.setCurrGame({} as GameListItem);
      game.setIsWatching(false);
      game.setIsReconnecting(false);
    };
  }, []);

  useEffect(() => {
    if (status === "END" && resume.leftPlayer && resume.rightPlayer) {
      fullscreen.handle.active ? fullscreen.handle.exit() : null;
      components.setDialogs({ ...components.dialogs, gameResumeOpen: true });
    }
  }, [resume, status]);

  return (
    <>
      <PlayerInfoStack
        leftPlayer={leftUser}
        rightPlayer={rightUser}
        stackProps={stackProps}
      />
      {action !== "NONE" ? (
        <CustomAnnoucementAnimation
          text={
            action === "BALL_SPEED_UP" || action === "BALL_SPEED_DOWN"
              ? "Ball Speed"
              : action === "PADDLE_SPEED_UP" || action === "PADDLE_SPEED_DOWN"
              ? "Paddle Speed"
              : "Control Inversion"
          }
          action={action}
          setAction={setAction}
          leftUser={leftUser}
          setLeftUser={setLeftUser}
          rightUser={rightUser}
          setRightUser={setRightUser}
          setStackProps={setStackProps}
        />
      ) : null}
      {game.isWatching ? (
        <IconButton
          color={user.color}
          sx={{
            position: "absolute",
            top: fullscreen.dimensions.height / 25,
            left: fullscreen.dimensions.height / 25,
            zIndex: 6,
          }}
          onClick={() => {
            game.setLocation("WATCH_LIST");
          }}
        >
          <ArrowBackIcon
            sx={{
              fontSize: fullscreen.dimensions.height / 15,
            }}
          />
        </IconButton>
      ) : null}
      <Box
        overflow="hidden"
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {components.dialogs.gameResumeOpen ? (
          <GameResumeDialog
            leftPlayerPoints={leftPoints}
            rightPlayerPoints={rightPoints}
            leftPlayer={resume.leftPlayer}
            rightPlayer={resume.rightPlayer}
          />
        ) : null}
        {status === "NEW_ROUND" ? (
          <Typography
            sx={{
              color: myTheme.accentColor,
              fontSize: fullscreen.dimensions.height / 4,
              fontWeight: "bold",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {countdown}
          </Typography>
        ) : (
          <>
            {action === "NONE" ? (
              <Stack
                sx={{
                  fontWeight: "bold",
                  position: "absolute",
                  top: fullscreen.dimensions.height / 25,
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                }}
                direction="row"
                spacing={2}
                >

                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: fullscreen.dimensions.height / 15,
                    fontWeight: "bold",
                  }}
                >
                  {leftPoints}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    backgroundColor: myTheme.accentColor,
                    height: fullscreen.dimensions.height / 10,
                  }}
                />
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: fullscreen.dimensions.height / 15,
                    fontWeight: "bold",
                  }}
                  >
                  {rightPoints}
                </Typography>
              </Stack>
            ) : null}
            <animated.div
              id="ball"
              style={{
                height: fullscreen.dimensions.width * 0.005 + fullscreen.dimensions.height * 0.005,
                width: fullscreen.dimensions.width * 0.005 + fullscreen.dimensions.height * 0.005,
                backgroundColor: myTheme.accentColor,
                borderRadius: "50%",
                position: "absolute",
                top: to([ballPos.y], (y) => y + "%"),
                left: to([ballPos.x], (x) => x + "%"),
                transform: to(
                  [ballPos.x, ballPos.y],
                  (x, y) => `translate(-${x}%, -${y}%)`
                ),
              }}
            />
            <animated.div
              id="left-paddle"
              style={{
                height: "20%",
                width: "1%",
                backgroundColor: myTheme.accentColor,
                position: "absolute",
                left: "1%",
                top: to([leftPaddlePos.y], (y) => y + "%"),
                transform: to([leftPaddlePos.y], (y) => `translateY(-${y}%)`),
              }}
            />
            <animated.div
              id="right-paddle"
              style={{
                height: "20%",
                width: "1%",
                backgroundColor: myTheme.accentColor,
                position: "absolute",
                right: "1%",
                top: to([rightPaddlePos.y], (y) => y + "%"),
                transform: to([rightPaddlePos.y], (y) => `translateY(-${y}%)`),
              }}
            />
          </>
        )}
      </Box>
    </>
  );
}
