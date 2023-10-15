import { Color } from "../../../common/Theme";
import { achievements } from "../context/user.context";

export enum UserState {
  UNKNOW,
  REGISTERED,
  UNREGISTERED,
}

const ONLINE = "ONLINE";
const OFFLINE = "OFFLINE";
const IN_GAME = "IN_GAME";

export type UserStatus = typeof ONLINE | typeof OFFLINE | typeof IN_GAME;

export interface UserData {
  socket?: string;
  twoFA?: "NONE" | "GOOGLE" | "PHONE";
  username?: string;
  avatar?: string;
  status?: UserStatus;
  studentId?: string;
  gmail?: string;
  phone?: string;
  achievements?: achievements;
  color?: Color;
}

export interface User {
  studentId: string;
  username: string;
  avatar: string;
  status: UserStatus;
}

export interface Users {
  // the one who send the request
  studentId: string;
  // the one who receive the request
  friendStudentId: string;
}
