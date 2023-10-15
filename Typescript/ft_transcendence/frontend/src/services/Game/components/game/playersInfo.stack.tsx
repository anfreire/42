import { Avatar, Stack, Typography } from "@mui/material";
import { useFullScreen } from "../..";
import { useTheme } from "../../../../common/Theme";
import { SpringValue, animated } from "react-spring";

export default function PlayerInfoStack({
  leftPlayer,
  rightPlayer,
  stackProps,
}: {
  leftPlayer: { username: string; avatar: string };
  rightPlayer: { username: string; avatar: string };
  stackProps: { opacity: SpringValue<number> };
}) {
  const theme = useTheme();
  const fullscreen = useFullScreen();
  const AnimatedStack = animated(Stack);

  return (
    <Stack
      sx={{
        fontWeight: "bold",
        position: "absolute",
        top: fullscreen.dimensions.height / 40,
        left: "50%",
        transform: "translate(-50%, 0)",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      direction="row"
    >
      <AnimatedStack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "40px",
        }}
        style={{ opacity: stackProps.opacity }}
      >
        <Typography
          sx={{
            color: theme.accentColor,
            fontSize: fullscreen.dimensions.height / 20,
            opacity: 0.5,
          }}
        >
          {leftPlayer.username}
        </Typography>
        <Avatar
          sx={{
            marginLeft: "10px",
            opacity: 0.3,
            width: fullscreen.dimensions.height / 15,
            height: fullscreen.dimensions.height / 15,
          }}
          src={leftPlayer.avatar}
        />
      </AnimatedStack>
      <AnimatedStack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "40px",
        }}
        style={{ opacity: stackProps.opacity }}
      >
        <Avatar
          sx={{
            marginRight: "10px",
            opacity: 0.3,
            width: fullscreen.dimensions.height / 15,
            height: fullscreen.dimensions.height / 15,
          }}
          src={rightPlayer.avatar}
        />
        <Typography
          sx={{
            color: theme.accentColor,
            fontSize: fullscreen.dimensions.height / 20,
            marginRight: "40px",
            opacity: 0.5,
          }}
        >
          {rightPlayer.username}
        </Typography>
      </AnimatedStack>
    </Stack>
  );
}
