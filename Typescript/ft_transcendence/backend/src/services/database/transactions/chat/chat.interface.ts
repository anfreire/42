import { User } from '../user/user.interface';

export interface ChatUsers {
  studentId1: string;
  studentId2: string;
}

export interface ChatMessage {
  from: User;
  content: string;
  createdAt: Date;
  isGame: boolean;
}

export interface ChatListItem extends User {
  createdAt: Date;
  lastSeenMessages: number;
}
