import { User } from "../../../User";

export interface ChatListItem extends User {
  createdAt: Date;
  lastSeenMessages: number;
}

export interface ChatUsers {
  studentId: string;
  friendStudentId: string;
}
