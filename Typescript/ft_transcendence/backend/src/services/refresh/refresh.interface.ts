export enum RefreshEvents {
  MESSAGE_SENT, //-------------[X]
  MESSAGE_DELETED, //----------[X]
  AVATAR_CHANGE, //------------[X]
  GAME_INVITE_SENT, //---------[ ]
  GAME_INVITE_RESPONSE, //-----[ ]
  FRIEND_REQUEST_SENT, //------[X]
  FRIEND_REQUEST_RESPONSE, //--[X]
  FRIEND_REMOVED, //-----------[X]
  STATUS_CHANGE, //------------[X]
  CHANNEL_CREATED, //----------[X]
  CHANNEL_REMOVED, //----------[X]
  CHANNEL_JOINED, //-----------[X]
  CHANNEL_LEFT, //-------------[X]
  CHAT_CREATED, //-------------[X]
  CHANNEL_ADMIN_PROMOTION, //--[X]
  CHANNEL_ADMIN_DEMOTION, //---[X]
  CHANNEL_USER_INVIATION, //---[X]
  CHANNEL_USER_BAN, //---------[X]
  CHANNEL_USER_UNBAN, //-------[X]
  CHANNEL_USER_KICKED, //------[X]
  CHANNEL_USER_MUTED, //-------[ ]
  CHANNEL_USER_UNMUTED, //-----[ ]
  CHANNEL_UPDATED, //----------[ ]
  USER_MUTED, //---------------[ ]
  USER_BLOCKED, //-------------[ ]
  UPDATE_ACHIEVEMENTS, //------[X]
}

export interface RefreshConversations {
  studentId: string;
  friendStudentId?: string;
  type: "CHAT" | "CHANNEL";
  event:
    | RefreshEvents.CHAT_CREATED
    | RefreshEvents.CHANNEL_CREATED
    | RefreshEvents.CHANNEL_REMOVED
    | RefreshEvents.CHANNEL_ADMIN_PROMOTION
    | RefreshEvents.CHANNEL_ADMIN_DEMOTION
    | RefreshEvents.CHANNEL_USER_INVIATION
    | RefreshEvents.CHANNEL_USER_BAN
    | RefreshEvents.CHANNEL_JOINED
    | RefreshEvents.CHANNEL_LEFT
    | RefreshEvents.CHANNEL_USER_UNBAN
    | RefreshEvents.CHANNEL_UPDATED
    | RefreshEvents.CHANNEL_USER_KICKED
    | RefreshEvents.CHANNEL_USER_MUTED
    | RefreshEvents.CHANNEL_USER_UNMUTED;
  name: string; // chat name or channel name
}

export interface RefreshMessages {
  studentId: string;
  type: "CHAT" | "CHANNEL" | "QUEUE";
  friendStudentId?: string;
  event:
    | RefreshEvents.MESSAGE_SENT
    | RefreshEvents.MESSAGE_DELETED
    | RefreshEvents.GAME_INVITE_SENT
    | RefreshEvents.GAME_INVITE_RESPONSE;
  name: string; // chat name or channel name
}

export interface RefreshUserData {
  studentId: string;
  event:
    | RefreshEvents.AVATAR_CHANGE
    | RefreshEvents.STATUS_CHANGE
    | RefreshEvents.UPDATE_ACHIEVEMENTS;
}

export interface RefreshFriends {
  studentId: string;
  friendStudentId: string;
  event:
    | RefreshEvents.FRIEND_REQUEST_SENT
    | RefreshEvents.FRIEND_REQUEST_RESPONSE
    | RefreshEvents.FRIEND_REMOVED
    | RefreshEvents.USER_MUTED
    | RefreshEvents.USER_BLOCKED;
  accepted?: boolean;
}

export type RefreshRequest =
  | RefreshConversations
  | RefreshMessages
  | RefreshUserData
  | RefreshFriends;

export interface RefreshResponse {
  request: RefreshRequest;
  fromUsername: string;
  target: string[];
  data: any;
  updateMessages: boolean;
  updateFriendList: boolean;
  updateFriendRequestList: boolean;
  updateProfile: boolean;
  updateConversations: boolean;
  updateCurrentConversation: boolean;
  updateChannelUsers: boolean;
  updateCurrGame: boolean;
  updateBlockedUsers: boolean;
  updateAchievements: boolean;
}
