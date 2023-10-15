import {
  RefreshConversations,
  RefreshFriends,
  RefreshMessages,
  RefreshResponse,
} from "..";
import {
  ChannelListItem,
  ChatListItem,
  ConversationsProps,
} from "../../../services/Conversations";
import { GameProps } from "../../../services/Game";
import { NotificationsProps } from "../../../services/Notifications";
import { UserProps } from "../../../services/User";

export class RefreshEventsHandler {
  static handleMessageSent(
    data: RefreshResponse,
    user: UserProps,
    notifications: NotificationsProps,
    conversations: ConversationsProps
  ) {
    data.request = data.request as RefreshMessages;
    if (data.fromUsername === user.username) return;
    if (
      data.request.type === "CHAT" &&
      (conversations.location != "CHAT" ||
        (conversations.location === "CHAT" &&
          (conversations.currConversation.data as ChatListItem).username !==
            data.fromUsername))
    ) {
      notifications.setInfoMessage(data.fromUsername + " sent you a message");
    } else if (
      data.request.type === "CHANNEL" &&
      (conversations.location !== "CHANNEL" ||
        (conversations.location === "CHANNEL" &&
          (conversations.currConversation.data as ChannelListItem).name !==
            data.request.name))
    ) {
      notifications.setInfoMessage(
        'You received a message in "' +
          data.request.name +
          '" from ' +
          data.fromUsername
      );
    }
  }

  static async handleFriendRequestResponse(
    data: RefreshResponse,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshFriends;
    if (data.request.accepted === undefined) return;
    else if (data.request.accepted === true)
      notifications.setInfoMessage(
        data.fromUsername + " accepted your friend request"
      );
    else if (data.request.accepted === false)
      notifications.setInfoMessage(
        data.fromUsername + " declined your friend request"
      );
  }

  static handleFriendRequestSent(
    data: RefreshResponse,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshFriends;
    notifications.setInfoMessage(
      data.fromUsername + " sent you a friend request"
    );
  }

  static async handleFriendRemoved(
    data: RefreshResponse,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshFriends;
    notifications.setInfoMessage(
      "You are no longer friends with " + data.fromUsername
    );
  }

  static async handleChatCreated(
    data: RefreshResponse,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshConversations;
    notifications.setInfoMessage(
      data.fromUsername + " created a chat with you"
    );
  }

  static async handleChannelCreated(
    data: RefreshResponse,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshConversations;
    notifications.setInfoMessage(
      data.fromUsername + " created a channel with you"
    );
  }

  static async handleChannelRemoved(
    data: RefreshResponse,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshConversations;
    notifications.setInfoMessage(
      data.fromUsername + " removed the channel" + data.request.name
    );
  }

  static async handleChannelAdminPromotion(
    data: RefreshResponse,
    user: UserProps,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshConversations;
    if (data.request.friendStudentId === user.studentId)
      notifications.setInfoMessage(
        data.fromUsername + " promoted you to admin in " + data.request.name
      );
  }

  static async handleChannelAdminDemotion(
    data: RefreshResponse,
    user: UserProps,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshConversations;
    if (data.request.friendStudentId === user.studentId)
      notifications.setInfoMessage(
        data.fromUsername + " demoted you from admin in " + data.request.name
      );
  }

  static async handleChannelUserInvitation(
    data: RefreshResponse,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshConversations;
    notifications.setInfoMessage(
      data.fromUsername + " added you to " + data.request.name
    );
  }

  static async handleChannelUserBan(
    data: RefreshResponse,
    user: UserProps,
    notifications: NotificationsProps,
    conversations: ConversationsProps
  ) {
    data.request = data.request as RefreshConversations;
    if (data.request.friendStudentId === user.studentId) {
      conversations.setLocation("CONVERSATIONS");
      notifications.setInfoMessage(
        data.fromUsername + " banned you from " + data.request.name
      );
    }
  }

  static async handleChannelUserUnban(
    data: RefreshResponse,
    user: UserProps,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshConversations;
    if (data.request.friendStudentId === user.studentId) {
      notifications.setInfoMessage(
        data.fromUsername + " unbanned you from " + data.request.name
      );
    }
  }

  static async handleUserKicked(
    data: RefreshResponse,
    user: UserProps,
    conversations: ConversationsProps,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshConversations;
    if (data.request.friendStudentId === user.studentId) {
      notifications.setInfoMessage(
        data.fromUsername + " kicked you from " + data.request.name
      );
      conversations.setLocation("CONVERSATIONS");
    }
  }

  static async handleGameInviteSent(
    data: RefreshResponse,
    notifications: NotificationsProps
  ) {
    data.request = data.request as RefreshMessages;
    if (data.request.type === "CHAT")
      notifications.setInfoMessage(
        data.fromUsername + " sent you a game invite"
      );
    else if (data.request.type === "CHANNEL")
      notifications.setInfoMessage(
        data.fromUsername + " sent you a game invite in " + data.request.name
      );
  }

  static async handleGameInviteResponse(
    data: RefreshResponse,
    game: GameProps
  ) {
    data = data as RefreshResponse;
    if (data.data) {
      game.setCurrGame(data.data);
      game.setSelection({
        type: data.data.type,
        level: data.data.level,
        mode: data.data.mode,
      });
      game.setIsWatching(false);
      game.setLocation("GAME");
    }
  }
}
