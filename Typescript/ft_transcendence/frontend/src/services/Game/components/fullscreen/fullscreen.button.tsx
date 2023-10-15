import { Button } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useFullScreen } from "../..";
import { useTheme as useMyTheme } from "../../../../common/Theme";
import { useUser } from "../../../User";

export default function FullscreenButton() {
  const fullscreen = useFullScreen();
  const myTheme = useMyTheme();
  const user = useUser();

  return fullscreen.handle.active ? (
    <Button
      onClick={fullscreen.handle.exit}
      color={user.color}
      sx={{
        position: "absolute",
        bottom: "0",
        right: "0",
        "&:hover": {
          color: myTheme.accentColor,
        },
        color: "transparent",
        zIndex: 3,
      }}
    >
      <FullscreenExitIcon
        sx={{
          width: "75px",
          height: "75px",
        }}
      />
    </Button>
  ) : (
    <Button
      onClick={fullscreen.handle.enter}
      color={user.color}
      sx={{
        position: "absolute",
        bottom: "0",
        right: "0",
        "&:hover": {
          color: myTheme.accentColor,
        },
        color: "transparent",
        zIndex: 3,
      }}
    >
      <FullscreenIcon
        sx={{
          width: "50px",
          height: "50px",
        }}
      />
    </Button>
  );
}
