import { SpringRef } from "react-spring";
import { GameProps, GameUtils } from "..";
import { mySocket } from "../../../common/Socket";
import { UserProps } from "../../User";
import {
  CustomActions,
  GameCountdown,
  GameKeyPress,
  GamePoints,
  GamePosition,
  GameRequestEvents,
  GameResume,
  GameStatus,
} from "./game.types";

interface SetGameProps {
  setBallPos: SpringRef<{
    x: number;
    y: number;
  }>;
  setRightPaddlePos: SpringRef<{
    y: number;
  }>;
  setLeftPaddlePos: SpringRef<{
    y: number;
  }>;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<
    React.SetStateAction<"START" | "NEW_ROUND" | "END">
  >;
  setLeftPoints: React.Dispatch<React.SetStateAction<number>>;
  setRightPoints: React.Dispatch<React.SetStateAction<number>>;
  setResume: React.Dispatch<React.SetStateAction<GameResume>>;
  setAction: React.Dispatch<React.SetStateAction<CustomActions>>;
  setLeftUser: React.Dispatch<
    React.SetStateAction<{ username: string; avatar: string }>
  >;
  setRightUser: React.Dispatch<
    React.SetStateAction<{ username: string; avatar: string }>
  >;
}

export class GameHelper {
  static async createSoloGame(socket: mySocket, user: any, game: GameProps) {
    const res = await GameUtils.createSoloGame(socket, user, game.selection);
    if (res) game.setCurrGame(res);
    return res ? true : false;
  }

  static handleKey(e: KeyboardEvent, socket: mySocket, gameId: number) {
    if (
      e.key === "ArrowUp" ||
      e.key === "w" ||
      e.key === "ArrowDown" ||
      e.key === "s"
    ) {
      const body: GameKeyPress = {
        event: GameRequestEvents.KEY_PRESS,
        roomId: gameId,
        key: e.key === "ArrowUp" || e.key === "w" ? "UP" : "DOWN",
      };
      socket.send("game/keypress", body);
    }
  }

  static connect(
    socket: mySocket,
    gameId: number,
    user: UserProps,
    game: GameProps,
    stateProps: SetGameProps
  ) {
    if (!user.studentId) return;
    const isBot = game.currGame?.players.find(
      (player) => player.studentId === "0"
    );
    socket.subscribe(
      "game/initialData",
      (data: {
        leftUser: {
          username: string;
          avatar: string;
        };
        rightUser: {
          username: string;
          avatar: string;
        };
      }) => {
        stateProps.setLeftUser(data.leftUser);
        stateProps.setRightUser(data.rightUser);
        socket.unsubscribe("game/initialData");
      }
    );
    socket.send("game/connection", {
      event: game.isWatching
        ? GameRequestEvents.WATCH
        : GameRequestEvents.CONNECTION,
      studentId: user.studentId,
      roomId: gameId,
      connection: true,
      solo: isBot ? true : false,
      level: game.selection.level,
      ...(game.isWatching ? { watching: true } : {}),
      mode: game.selection.mode ?? game.currGame?.mode,
    });
    socket.subscribe("game/status", (data: GameStatus) =>
      GameHelper.handleGameStatus(
        data,
        stateProps.setStatus,
        socket,
        game,
        gameId
      )
    );
    socket.subscribe("game/countdown", (data: GameCountdown) =>
      GameHelper.handleGameCountdown(
        data,
        stateProps.setCountdown,
        stateProps.setAction
      )
    );
    socket.subscribe("game/position", (data: GamePosition) =>
      GameHelper.handleGamePosition(
        data,
        stateProps.setBallPos,
        stateProps.setRightPaddlePos,
        stateProps.setLeftPaddlePos
      )
    );
    socket.subscribe("game/points", (data: GamePoints) =>
      GameHelper.handleGamePoints(
        data,
        stateProps.setLeftPoints,
        stateProps.setRightPoints
      )
    );
    socket.subscribe("game/resume", (data: GameResume) => {
      stateProps.setResume(data);
    });
    socket.subscribe("game/actions", (data: { action: CustomActions }) =>
      stateProps.setAction(data.action)
    );
    if (game.isWatching) return;
    window.addEventListener("keydown", (e) => {
      GameHelper.handleKey(e, socket, gameId);
    });
  }

  static disconnect(
    socket: mySocket,
    gameId: number,
    user: UserProps,
    game: GameProps
  ) {
    if (!user.studentId) return;
    socket.unsubscribe("game/status");
    socket.unsubscribe("game/actions");
    socket.unsubscribe("game/countdown");
    socket.unsubscribe("game/position");
    socket.unsubscribe("game/points");
    if (game.isWatching) return;
    window.removeEventListener("keydown", (e) =>
      GameHelper.handleKey(e, socket, gameId)
    );
  }

  static handleGameResume(
    data: GameResume,
    setResume: React.Dispatch<React.SetStateAction<GameResume>>
  ) {
    setResume(data);
  }

  static handleGameStatus(
    data: GameStatus,
    setStatus: React.Dispatch<
      React.SetStateAction<"START" | "NEW_ROUND" | "END">
    >,
    socket: mySocket,
    game: GameProps,
    gameId: number
  ) {
    if (!game.isWatching) {
      if (data.status === "NEW_ROUND" || data.status === "END")
        window.removeEventListener("keydown", (e) =>
          GameHelper.handleKey(e, socket, gameId)
        );
      else
        window.addEventListener("keydown", (e) =>
          GameHelper.handleKey(e, socket, gameId)
        );
    }
    setStatus(data.status);
  }

  static handleGameCountdown(
    data: GameCountdown,
    setCountdown: React.Dispatch<React.SetStateAction<number>>,
    setAction: React.Dispatch<React.SetStateAction<CustomActions>>
  ) {
    setCountdown(data.count);
    if (data.count !== 0) setAction("NONE");
  }

  static handleGamePosition(
    data: GamePosition,
    setBallPos: SpringRef<{
      x: number;
      y: number;
    }>,
    setRightPaddlePos: SpringRef<{
      y: number;
    }>,
    setLeftPaddlePos: SpringRef<{
      y: number;
    }>
  ) {
    setBallPos.start(data.ball);
    setRightPaddlePos.start(data.rightPaddle);
    setLeftPaddlePos.start(data.leftPaddle);
  }

  static handleGamePoints(
    data: GamePoints,
    setLeftPoints: React.Dispatch<React.SetStateAction<number>>,
    setRightPoints: React.Dispatch<React.SetStateAction<number>>
  ) {
    setLeftPoints(data.leftPoints);
    setRightPoints(data.rightPoints);
  }
}
