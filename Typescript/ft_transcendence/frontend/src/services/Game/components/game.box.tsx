import { Box, useTheme } from "@mui/material";
import {
  FullScreenHook,
  GameBoxContent,
  QueueBoxContent,
  SelectModeBoxContent,
  StartBoxContent,
  WatchListBoxContent,
  useFullScreen,
  useGame,
} from "..";
import { useTheme as useMyTheme } from "../../../common/Theme";
import { centerContentCSS } from "../../../common/Components";

export default function GameBox() {
  const game = useGame();
  const fullscreen = useFullScreen();
  const theme = useTheme();
  const myTheme = useMyTheme();

  return (
    <>
      <FullScreenHook>
        <Box
          sx={{
            width: fullscreen.dimensions.width - 5,
            height: fullscreen.dimensions.height - 2,
            borderRadius: 3,
            borderColor: myTheme.accentColor,
            backgroundColor: theme.palette.background.default,
            ...centerContentCSS,
            overflow: "hidden",
          }}
          overflow="hidden"
        >
          {game.location === "START" ? (
            <StartBoxContent />
          ) : game.location === "SOLO_OR_DUO" ||
            game.location === "WHICH_MODE" ? (
            <SelectModeBoxContent />
          ) : game.location === "QUEUE" ? (
            <QueueBoxContent />
          ) : game.location === "WATCH_LIST" ? (
            <WatchListBoxContent />
          ) : game.location === "WATCH_GAME" ? (
            <WatchListBoxContent />
          ) : game.location === "GAME" ? (
            <GameBoxContent />
          ) : null}
        </Box>
      </FullScreenHook>
    </>
  );
}
