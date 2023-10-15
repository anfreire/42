import FullscreenButton from "./components/fullscreen/fullscreen.button";
import GameBoxContent from "./components/game/game.boxContent";
import GameResumeDialog from "./components/game/gameResume.dialog";
import GameInviteDialog from "./components/invite/gameInvite.dialog";
import GameInviteMessageBox from "./components/invite/gameInviteMessage.box";
import QueueBoxContent from "./components/queue/queue.boxContent";
import SelectModeBoxContent from "./components/select/selectMode.boxContent";
import SoloOrDuoBoxContent from "./components/select/soloOrDuo.boxContent";
import WhichModeBoxContent from "./components/select/whichMode.boxContent";
import StartBoxContent from "./components/start/start.boxContent";
import StartScreenAnimation from "./components/start/startScreen.animation";
import WatchListBoxContent from "./components/watch/watchList.boxContent";
import GameBox from "./components/game.box";
import GameHistoryDialog from "./components/history/gameHistory.dialog";

export {
  FullscreenButton,
  GameBoxContent,
  GameResumeDialog,
  GameInviteDialog,
  GameInviteMessageBox,
  QueueBoxContent,
  SelectModeBoxContent,
  SoloOrDuoBoxContent,
  WhichModeBoxContent,
  StartBoxContent,
  StartScreenAnimation,
  WatchListBoxContent,
  GameBox,
  GameHistoryDialog,
};

import {
  FullScreenProvider,
  useFullScreen,
} from "./context/fullscreen.context";
import { GameProps, GameProvider, useGame } from "./context/game.context";

export {
  FullScreenProvider,
  useFullScreen,
  type GameProps,
  GameProvider,
  useGame,
};

import FullScreenHook from "./hooks/fullscreen.hook";

export { FullScreenHook };

import { GameHelper } from "./utils/game.helper";
import {
  GameResponseEvents,
  GameStatus,
  GameCountdown,
  GamePosition,
  GamePoints,
  GameResume,
  GameResponse,
  GameRequestEvents,
  GameConnection,
  GameKeyPress,
  GameRequest,
  GameListItem,
  GameJoin,
  GameSelection,
  GameQueue,
} from "./utils/game.types";
import { GameUtils } from "./utils/game.utils";

export {
  GameHelper,
  GameResponseEvents,
  type GameStatus,
  type GameCountdown,
  type GamePosition,
  type GamePoints,
  type GameResume,
  type GameResponse,
  GameRequestEvents,
  type GameConnection,
  type GameKeyPress,
  type GameRequest,
  type GameListItem,
  type GameJoin,
  type GameSelection,
  type GameQueue,
  GameUtils,
};
