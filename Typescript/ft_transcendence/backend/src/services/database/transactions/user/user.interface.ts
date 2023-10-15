import { $Enums, Achievements } from '@prisma/client';

export enum UserState {
  UNKNOW,
  REGISTERED,
  UNREGISTERED,
}

const ONLINE = 'ONLINE';
const OFFLINE = 'OFFLINE';
const IN_GAME = 'IN_GAME';

export type UserStatus = typeof ONLINE | typeof OFFLINE | typeof IN_GAME;

export interface UserDataOptions {
  socket: boolean;
  studentId: boolean;
  twoFA: boolean;
  username: boolean;
  gmail: boolean;
  phone: boolean;
  status: boolean;
  state: boolean;
}

export interface UserData {
  socket?: string;
  studentId?: string;
  twoFA?: string;
  username?: string;
  gmail?: string;
  phone?: string;
  status?: UserStatus;
  state?: UserState;
  achievements?: Achievements;
  color?: $Enums.color;
}

export interface User {
  username: string;
  studentId: string;
  avatar: string;
  status: string;
}

export interface Users {
  // the one who send the request
  studentId: string;
  // the one who receive the request
  friendStudentId: string;
}
