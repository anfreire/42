//-------------------------------------------------------------------------
// SERVER SIDE

import { Message } from "../../Conversations";
import { User } from "../../User";

export enum GameResponseEvents {
  STATUS,
  COUNTDOWN,
  POSITION,
  POINTS,
}

export interface GameStatus {
  event: GameResponseEvents.STATUS;
  status: "START" | "NEW_ROUND" | "END";
}

export interface GameCountdown {
  event: GameResponseEvents.COUNTDOWN;
  count: number;
}

export interface GamePosition {
  event: GameResponseEvents.POSITION;
  leftPaddle: {
    y: number;
    config: {
      duration: number;
    };
  };
  rightPaddle: {
    y: number;
    config: {
      duration: number;
    };
  };
  ball: {
    x: number;
    y: number;
    config: {
      duration: number;
    };
  };
}

export interface GamePoints {
  event: GameResponseEvents.POINTS;
  leftPoints: number;
  rightPoints: number;
}
export interface GameResume {
  leftPlayer: User;
  rightPlayer: User;
}

export type GameResponse =
  | GameStatus
  | GameCountdown
  | GamePosition
  | GamePoints;

//-------------------------------------------------------------------------

//-------------------------------------------------------------------------
// CLIENT SIDE

export enum GameRequestEvents {
  KEY_PRESS,
  CONNECTION,
  WATCH,
}

export interface GameKeyPress {
  event: GameRequestEvents.KEY_PRESS;
  roomId: number;
  key: "UP" | "DOWN";
}

export interface GameConnection {
  event: GameRequestEvents.CONNECTION;
  studentId: string;
  roomId: number;
  connection: boolean;
  solo?: boolean;
  level?: "EASY" | "MEDIUM" | "HARD";
}

export interface GameWatch extends GameConnection {
  isWatching: boolean;
}

export type GameRequest = GameKeyPress | GameConnection | GameWatch;

//-------------------------------------------------------------------------

export interface GameSelection {
  type: "SOLO" | "DUO" | undefined;
  level: "EASY" | "MEDIUM" | "HARD" | undefined;
  mode: "CLASSIC" | "CUSTOM" | undefined;
}

export interface GameQueue extends GameSelection {
  studentId: string;
  on: "CHANNEL" | "CHAT" | "QUEUE";
  message?: Message;
}

export interface GameJoin extends GameQueue {
  whoJoinsStudentId: string;
}

export interface GameListItem {
  id: number;
  players: User[];
  winner?: User;
  looser?: User;
  mode: "CLASSIC" | "CUSTOM";
  points: number[];
  level?: "EASY" | "MEDIUM" | "HARD";
  type?: "SOLO" | "DUO";
}

export type CustomActions =
  | "BALL_SPEED_UP"
  | "BALL_SPEED_DOWN"
  | "PADDLE_SPEED_UP"
  | "PADDLE_SPEED_DOWN"
  | "INVERT_CONTROLS"
  | "NONE";
