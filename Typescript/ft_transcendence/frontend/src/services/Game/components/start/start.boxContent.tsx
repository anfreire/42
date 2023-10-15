import { Button, Stack } from "@mui/material";
import { StartScreenAnimation, useFullScreen, useGame } from "../..";
import { useUser } from "../../../User";

export default function StartBoxContent() {
  const game = useGame();
  const fullscreen = useFullScreen();
  const user = useUser();

  return (
    <>
      <Stack
        spacing={4}
        direction="column"
        padding={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Button
          variant="outlined"
          color={user.color}
          style={{
            fontSize:
              (fullscreen.dimensions.width / 20) * 0.4 +
              (fullscreen.dimensions.height / 7.5) * 0.6,
            fontWeight: "bold",
          }}
          onClick={() => game.setLocation("SOLO_OR_DUO")}
        >
          START
        </Button>
        <Button
          variant="outlined"
          color={user.color}
          style={{
            fontSize:
              (fullscreen.dimensions.width / 20) * 0.4 +
              (fullscreen.dimensions.height / 7.5) * 0.6,
            fontWeight: "bold",
          }}
          onClick={() => game.setLocation("WATCH_LIST")}
        >
          Watch
        </Button>
      </Stack>
      <StartScreenAnimation />
    </>
  );
}
