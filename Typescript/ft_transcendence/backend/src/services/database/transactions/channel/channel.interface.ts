export interface ChannelData {
  name: string;
  avatar: string;
  type: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
}

export interface ChannelUser {
  username: string;
  studentId: string;
  avatar: string;
  status: string;
}

export interface ChannelUsers {
  owner: ChannelUser;
  users: ChannelUser[];
  admins: ChannelUser[];
  banned: ChannelUser[];
  muted: ChannelUser[];
}

export interface ChannelMessage {
  from: ChannelUser;
  content: string;
  createdAt: Date;
  isGame: boolean;
}

export interface ChannelListItem {
  id: number;
  name: string;
  avatar: string;
  online: number;
  createdAt: Date;
  lastSeenMessages: number;
  type: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
}
