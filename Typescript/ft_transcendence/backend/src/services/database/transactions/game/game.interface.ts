import { MessageExtended } from '../../entities/entities.interface';
import { User } from '../user/user.interface';

export interface Message {
  id: number;
  from: User;
  content: string;
  createdAt: Date;
  isGame: boolean;
}

export interface GameSelection {
  type: 'SOLO' | 'DUO' | undefined;
  level: 'EASY' | 'MEDIUM' | 'HARD' | undefined;
  mode: 'CLASSIC' | 'CUSTOM' | undefined;
}

export interface GameQueue extends GameSelection {
  studentId: string;
  on: 'CHANNEL' | 'CHAT' | 'QUEUE';
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
  mode: 'CLASSIC' | 'CUSTOM';
  points: number[];
  level?: 'EASY' | 'MEDIUM' | 'HARD';
  type?: 'SOLO' | 'DUO';
}
