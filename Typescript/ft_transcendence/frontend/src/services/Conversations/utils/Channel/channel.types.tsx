import { User } from "../../../User";

export interface ChannelListItem {
  id: number;
  name: string;
  avatar: string;
  online: number;
  createdAt: Date;
  lastSeenMessages: number;
  type: "PUBLIC" | "PRIVATE" | "PROTECTED";
}

export interface ChannelUsers {
  owner: User;
  users: User[];
  admins: User[];
  banned: User[];
  muted: User[];
}
