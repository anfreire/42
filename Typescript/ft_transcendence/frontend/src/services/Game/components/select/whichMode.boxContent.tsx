import {
  Button,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GameHelper, useFullScreen, useGame } from "../..";
import { useSocket } from "../../../../common/Socket";
import { useUser } from "../../../User";
import { useTheme as useMyTheme } from "../../../../common/Theme";

export default function WhichModeBoxContent() {
  const myTheme = useMyTheme();
  const fullscreen = useFullScreen();
  const game = useGame();
  const socket = useSocket();
  const user = useUser();

  return (
    <Stack
      spacing={4}
      direction="column"
      sx={{
        width: "100%", // fullscreen.dimensions.width,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <IconButton
        color={user.color}
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
        onClick={() => {
          game.setSelection({
            type: undefined,
            mode: undefined,
            level: undefined,
          });
          game.setLocation("SOLO_OR_DUO");
        }}
      >
        <ArrowBackIcon
          sx={{
            fontSize: fullscreen.dimensions.height / 15,
          }}
        />
      </IconButton>
      {game.selection?.type === "SOLO" ? (
        <Stack
          spacing={2}
          direction="column"
          sx={{
            width: "100%", // fullscreen.dimensions.width,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize:
                (fullscreen.dimensions.width / 30) * 0.4 +
                (fullscreen.dimensions.height / 20) * 0.6,
              color: myTheme.accentColor,
            }}
          >
            How confident are you ?
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={game.selection?.level}
            sx={{
              color: myTheme.accentColor,
            }}
          >
            <ToggleButton
              value="EASY"
              onClick={() =>
                game.setSelection((prev) => ({
                  ...prev,
                  level: "EASY",
                }))
              }
              color={user.color}
              sx={{
                color: myTheme.accentColor,
                width: fullscreen.dimensions.width / 5,
                height: fullscreen.dimensions.height / 7,
                fontSize:
                  (fullscreen.dimensions.width / 50) * 0.4 +
                  (fullscreen.dimensions.height / 40) * 0.6,
              }}
            >
              Go easy on me
            </ToggleButton>
            <ToggleButton
              value="MEDIUM"
              onClick={() => {
                game.setSelection((prev) => ({
                  ...prev,
                  level: "MEDIUM",
                }));
              }}
              color={user.color}
              sx={{
                color: myTheme.accentColor,
                width: fullscreen.dimensions.width / 5,
                height: fullscreen.dimensions.height / 7,
                fontSize:
                  (fullscreen.dimensions.width / 50) * 0.4 +
                  (fullscreen.dimensions.height / 40) * 0.6,
              }}
            >
              I'm feeling lucky
            </ToggleButton>
            <ToggleButton
              value="HARD"
              onClick={() => {
                game.setSelection((prev) => ({
                  ...prev,
                  level: "HARD",
                }));
              }}
              color={user.color}
              sx={{
                color: myTheme.accentColor,
                width: fullscreen.dimensions.width / 5,
                height: fullscreen.dimensions.height / 7,
                fontSize:
                  (fullscreen.dimensions.width / 50) * 0.4 +
                  (fullscreen.dimensions.height / 40) * 0.6,
              }}
            >
              I can beat anyone
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      ) : null}
      <Stack
        spacing={3}
        direction="column"
        sx={{
          width: "100%", // fullscreen.dimensions.width,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize:
              (fullscreen.dimensions.width / 30) * 0.4 +
              (fullscreen.dimensions.height / 15) * 0.6,
            color: myTheme.accentColor,
          }}
        >
          What's your poison ?
        </Typography>
        <ToggleButtonGroup
          exclusive
          value={game.selection?.mode}
          sx={{
            color: myTheme.accentColor,
          }}
        >
          <ToggleButton
            value="CLASSIC"
            onClick={() =>
              game.setSelection((prev) => ({
                ...prev,
                mode: "CLASSIC",
              }))
            }
            color={user.color}
            sx={{
              color: myTheme.accentColor,
              width: fullscreen.dimensions.width / 5,
              height: fullscreen.dimensions.height / 7,
              fontSize:
                (fullscreen.dimensions.width / 50) * 0.4 +
                (fullscreen.dimensions.height / 40) * 0.6,
            }}
          >
            Classic
          </ToggleButton>
          <ToggleButton
            value="CUSTOM"
            onClick={() => {
              game.setSelection((prev) => ({
                ...prev,
                mode: "CUSTOM",
              }));
            }}
            color={user.color}
            sx={{
              color: myTheme.accentColor,
              width: fullscreen.dimensions.width / 5,
              height: fullscreen.dimensions.height / 7,
              fontSize:
                (fullscreen.dimensions.width / 50) * 0.4 +
                (fullscreen.dimensions.height / 40) * 0.6,
            }}
          >
            Custom
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Button
        variant="contained"
        color={user.color}
        sx={{
          fontSize:
            (fullscreen.dimensions.width / 40) * 0.4 +
            (fullscreen.dimensions.height / 30) * 0.6,
        }}
        onClick={() => {
          (async () => {
            if (
              game.selection.mode &&
              ((game.selection.type === "SOLO" && game.selection.level) ||
                game.selection.type === "DUO")
            ) {
              if (
                game.selection?.type === "SOLO" &&
                (await GameHelper.createSoloGame(socket.socket, user, game))
              ) {
                game.setLocation("GAME");
                game.setIsWatching(false);
              } else game.setLocation("QUEUE");
            }
          })();
        }}
      >
        Play
      </Button>
    </Stack>
  );
}
