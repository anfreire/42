import { useState, useContext, createContext } from "react";
import { User } from "../../User";

export interface GameSelection {
  type: "SOLO" | "DUO" | undefined;
  level: "EASY" | "MEDIUM" | "HARD" | undefined;
  mode: "CLASSIC" | "CUSTOM" | undefined;
}
export interface GameListItem {
  id: number;
  players: User[];
  winner?: User;
  looser?: User;
  mode: "CLASSIC" | "CUSTOM";
  points: number[];
}

export type GameDialogOrigin = "CONVERSATION" | "PROFILE";

export interface GameProps {
  location:
    | "START"
    | "SOLO_OR_DUO"
    | "WHICH_MODE"
    | "QUEUE"
    | "GAME"
    | "WATCH_LIST"
    | "WATCH_GAME";
  setLocation: React.Dispatch<
    React.SetStateAction<
      | "START"
      | "SOLO_OR_DUO"
      | "WHICH_MODE"
      | "QUEUE"
      | "GAME"
      | "WATCH_LIST"
      | "WATCH_GAME"
    >
  >;
  selection: GameSelection;
  setSelection: React.Dispatch<React.SetStateAction<GameSelection>>;
  currGame: GameListItem | undefined;
  setCurrGame: React.Dispatch<React.SetStateAction<GameListItem | undefined>>;
  gameDialogOrigin: GameDialogOrigin;
  setGameDialogOrigin: React.Dispatch<React.SetStateAction<GameDialogOrigin>>;
  isWatching: boolean;
  setIsWatching: React.Dispatch<React.SetStateAction<boolean>>;
  isReconnecting: boolean;
  setIsReconnecting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameContext = createContext<GameProps>({} as GameProps);

export function GameProvider({ children }: any) {
  const [location, setLocation] = useState<
    | "START"
    | "SOLO_OR_DUO"
    | "WHICH_MODE"
    | "QUEUE"
    | "GAME"
    | "WATCH_LIST"
    | "WATCH_GAME"
  >("START");
  const [selection, setSelection] = useState<GameSelection>({
    type: undefined,
    level: undefined,
    mode: undefined,
  });
  const [currGame, setCurrGame] = useState<GameListItem | undefined>(undefined);
  const [gameDialogOrigin, setGameDialogOrigin] =
    useState<GameDialogOrigin>("CONVERSATION"); // 'CONVERSATION' | 'PROFILE
  const [isWatching, setIsWatching] = useState<boolean>(false);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);

  return (
    <GameContext.Provider
      value={{
        location,
        setLocation,
        selection,
        setSelection,
        currGame,
        setCurrGame,
        gameDialogOrigin,
        setGameDialogOrigin,
        isWatching,
        setIsWatching,
        isReconnecting,
        setIsReconnecting,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
