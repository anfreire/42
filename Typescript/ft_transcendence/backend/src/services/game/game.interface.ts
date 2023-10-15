import { Ball } from './ball';
import { Paddle } from './paddle';

export interface User {
  studentId: string;
  socket: string;
  side: 'LEFT' | 'RIGHT';
  paddle: Paddle;
  points: number;
}

export interface GameRoom {
  state: 'COUNTDOWN' | 'PLAYING' | 'FINISHED';
  roomId: number;
  players: User[];
  ball: Ball;
  round: number;
  level?: 'EASY' | 'MEDIUM' | 'HARD';
  mode: 'CLASSIC' | 'CUSTOM';
  customProps?: CustomProps;
  acceptKeys: boolean;
}

export type CustomActions =
  | 'BALL_SPEED_UP'
  | 'BALL_SPEED_DOWN'
  | 'PADDLE_SPEED_UP'
  | 'PADDLE_SPEED_DOWN'
  | 'INVERT_CONTROLS'
  | 'NONE';

export interface CustomProps {
  action: CustomActions;
}

//-------------------------------------------------------------------------
// SERVER SIDE

export enum GameResponseEvents {
  STATUS,
  COUNTDOWN,
  POSITION,
  POINTS,
}

export interface GameStatus {
  event: GameResponseEvents.STATUS;
  status: 'START' | 'NEW_ROUND' | 'END';
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
  | GamePoints
  | GameResume;

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
  key: 'UP' | 'DOWN';
}

export interface GameConnection {
  event: GameRequestEvents.CONNECTION;
  studentId: string;
  roomId: number;
  connection: boolean;
  solo: boolean;
  level?: 'EASY' | 'MEDIUM' | 'HARD';
  mode: 'CLASSIC' | 'CUSTOM';
}

export interface GameWatch extends GameConnection {
  isWatching: boolean;
}

export type GameRequest = GameKeyPress | GameConnection | GameWatch;

//-------------------------------------------------------------------------
