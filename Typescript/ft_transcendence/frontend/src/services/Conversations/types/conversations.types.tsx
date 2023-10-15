import { ChannelListItem, ChatListItem } from "..";
import { User } from "../../User";

export interface Message {
  id: number;
  from: User;
  content: string;
  createdAt: Date;
  isGame: boolean;
}

export interface BothListItem {
  data: ChatListItem | ChannelListItem;
  type: "CHAT" | "CHANNEL";
}