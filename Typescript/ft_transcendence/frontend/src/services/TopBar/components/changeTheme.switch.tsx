import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Stack, Switch } from "@mui/material";
import { useGame } from "../../Game/context/game.context";
import { useTheme } from "../../../common/Theme";

export default function ChangeThemeSwitch() {
  const game = useGame();
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        opacity: game.location === "GAME" ? 0.5 : 1,
        pointerEvents: game.location === "GAME" ? "none" : "auto",
      }}
    >
      <DarkModeIcon />
      <Switch
        onClick={() => {
          theme.setCurrTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light"
          );
        }}
        checked={theme.currTheme === "light"}
        color="default"
      />
      <LightModeIcon />
    </Stack>
  );
}
