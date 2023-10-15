import React, { useState } from "react";
import { BothListItem, ChannelListItem, ChatListItem, Message } from "..";
import { User } from "../../User";

export type ChatLocation =
  | "CHANNEL"
  | "CHAT"
  | "NEW_CONVERSATION"
  | "CONVERSATIONS"
  | "NEW_CHAT"
  | "NEW_CHANNEL"
  | "JOIN_CHANNEL";

export interface CurrentConversation {
  type: "CHANNEL" | "CHAT" | "NONE";
  data: ChannelListItem | ChatListItem | undefined;
}

export const NoneConversation: CurrentConversation = {
  type: "NONE",
  data: undefined,
};

export interface ChannelUser {
  data: User;
  role: "ADMIN" | "OWNER" | "USER" | "BANNED" | "MUTED";
}

export interface ConversationsProps {
  location: ChatLocation;
  setLocation: React.Dispatch<React.SetStateAction<ChatLocation>>;
  currConversation: CurrentConversation;
  setCurrConversation: React.Dispatch<
    React.SetStateAction<CurrentConversation>
  >;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  conversations: BothListItem[];
  setConversations: React.Dispatch<React.SetStateAction<BothListItem[]>>;
  channelUsers: ChannelUser[];
  setChannelUsers: React.Dispatch<React.SetStateAction<ChannelUser[]>>;
}

export const ConversationsContext = React.createContext<
  ConversationsProps | undefined
>(undefined);

export function ConversationsProvider({ children }: any) {
  const [location, setLocation] = useState<ChatLocation>("CONVERSATIONS");
  const [currConversation, setCurrConversation] =
    useState<CurrentConversation>(NoneConversation);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<BothListItem[]>([]);
  const [channelUsers, setChannelUsers] = useState<ChannelUser[]>([]);

  return (
    <ConversationsContext.Provider
      value={{
        location,
        setLocation,
        currConversation,
        setCurrConversation,
        messages,
        setMessages,
        conversations,
        setConversations,
        channelUsers,
        setChannelUsers,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  const context = React.useContext(ConversationsContext);
  if (!context) {
    throw new Error(
      "useConversations must be used within a ConversationsProvider"
    );
  }
  return context;
}
