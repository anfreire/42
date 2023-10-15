import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { GameUtils, useFullScreen, useGame } from "../..";
import { useTheme as useMyTheme } from "../../../../common/Theme";
import { useUser } from "../../../User";
import { useSocket } from "../../../../common/Socket";

export default function QueueBoxContent() {
  const myTheme = useMyTheme();
  const fullscreen = useFullScreen();
  const game = useGame();
  const [time, setTime] = useState(0);
  const user = useUser();
  const socket = useSocket();

  const convertTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    GameUtils.joinQueue(socket.socket, user, game.selection);
    return () => {
      GameUtils.leaveQueue(socket.socket, user);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <IconButton
        color={user.color}
        sx={{
          position: "absolute",
          top: "10px", // '10px
          left: "10px", // '10px
        }}
        onClick={() => {
          game.setLocation("WHICH_MODE");
        }}
      >
        <ArrowBackIcon
          sx={{
            fontSize: fullscreen.dimensions.height / 15,
          }}
        />
      </IconButton>
      <CountdownCircleTimer
        isPlaying
        isGrowing={true}
        duration={10}
        colors={myTheme.accentColor as `#${string}`}
        size={fullscreen.dimensions.height / 1.5}
        onComplete={(_) => ({
          shouldRepeat: true,
        })}
      >
        {() => (
          <Typography
            sx={{
              color: myTheme.accentColor,
              fontSize: fullscreen.dimensions.height / 4,
              fontWeight: "bold",
            }}
          >
            {convertTime(time)}
          </Typography>
        )}
      </CountdownCircleTimer>
    </Stack>
  );
}
