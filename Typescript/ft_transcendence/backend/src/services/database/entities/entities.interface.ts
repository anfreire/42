import { Prisma, Achievements } from '@prisma/client';

export const ChannelExtendedInclude = {
  users: true,
  owner: true,
  admins: true,
  banned: true,
  muted: true,
  messages: true,
};

export const ChatExtendedInclude = {
  users: true,
  messages: true,
};

export const MessageExtendedInclude = {
  chat: true,
  channel: true,
  sender: true,
  lastSeenBy: true,
};

export const GameExtendedInclude = {
  players: true,
  winner: true,
  loser: true,
};

export const UserExtendedInclude = {
  friends: true,
  friendRequests: true,
  blocked: true,
  messages: true,
  lastSeenMessages: true,
  channels: true,
  ownerOf: true,
  adminOf: true,
  bannedFrom: true,
  mutedFrom: true,
  chats: true,
  games: true,
  wins: true,
  losses: true,
  achievements: true,
};

export const AchievementsExtendedInclude = {
  users: true,
};

export type ChannelExtended = Prisma.ChannelGetPayload<{
  include: typeof ChannelExtendedInclude;
}>;
export type ChatExtended = Prisma.ChatGetPayload<{
  include: typeof ChatExtendedInclude;
}>;
export type MessageExtended = Prisma.MessageGetPayload<{
  include: typeof MessageExtendedInclude;
}>;
export type GameExtended = Prisma.GameGetPayload<{
  include: typeof GameExtendedInclude;
}>;
export type UserExtended = Prisma.UserGetPayload<{
  include: typeof UserExtendedInclude;
}>;
export type AchievementsExtend = Prisma.AchievementsGetPayload<{
  include: typeof AchievementsExtendedInclude;
}>;
