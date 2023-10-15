import {
  RefreshEvents,
  RefreshEventsHandler,
  RefreshHelper,
  RefreshRequest,
} from "..";
import { ConversationsProps } from "../../../services/Conversations";
import { GameProps } from "../../../services/Game";
import { NotificationsProps } from "../../../services/Notifications";
import { SocialProps } from "../../../services/Social";
import { UserProps } from "../../../services/User";
import { mySocket } from "../../Socket";

export class RefreshUtils {
  static updateRefresh(
    socket: mySocket,
    user: UserProps,
    notifications: NotificationsProps,
    conversations: ConversationsProps,
    social: SocialProps,
    game: GameProps
  ) {
    const callback = async (data: any) => {
      if (user.studentId && data.target.includes(user.studentId)) {
        if (data.updateMessages)
          await RefreshHelper.updateMessages(data, socket, user, conversations);
        if (data.updateConversations)
          await RefreshHelper.updateConversations(user, conversations, socket);
        if (data.updateFriendList)
          await RefreshHelper.updateFriendsList(socket, user, social);
        if (data.updateFriendRequestList)
          await RefreshHelper.updateFriendRequests(socket, user, social);
        if (data.updateChannelUsers)
          await RefreshHelper.updateChannelUsers(socket, conversations);
        if (data.updateProfile)
          await RefreshHelper.updateProfile(socket, user, social);
        if (data.updateConversations)
          await RefreshHelper.updateConversations(user, conversations, socket);
        if (data.updateCurrentConversation)
          await RefreshHelper.updateCurrConversation(
            socket,
            user,
            conversations
          );
        if (data.updateBlockedUsers)
          RefreshHelper.updateBlockedUsers(socket, user, social);
        if (data.updateAchievements)
          RefreshHelper.updateAchievements(socket, user);
        if (
          data.request.event !== RefreshEvents.GAME_INVITE_RESPONSE &&
          data.fromUsername === user.username
        )
          return;

        switch (data.request.event) {
          case RefreshEvents.MESSAGE_SENT:
            RefreshEventsHandler.handleMessageSent(
              data,
              user,
              notifications,
              conversations
            );
            break;
          case RefreshEvents.FRIEND_REQUEST_RESPONSE:
            await RefreshEventsHandler.handleFriendRequestResponse(
              data,
              notifications
            );
            break;
          case RefreshEvents.FRIEND_REQUEST_SENT:
            RefreshEventsHandler.handleFriendRequestSent(data, notifications);
            break;
          case RefreshEvents.CHANNEL_CREATED:
            RefreshEventsHandler.handleChannelCreated(data, notifications);
            break;
          case RefreshEvents.CHANNEL_REMOVED:
            RefreshEventsHandler.handleChannelRemoved(data, notifications);
            break;
          case RefreshEvents.CHANNEL_ADMIN_PROMOTION:
            RefreshEventsHandler.handleChannelAdminPromotion(
              data,
              user,
              notifications
            );
            break;
          case RefreshEvents.CHANNEL_ADMIN_DEMOTION:
            RefreshEventsHandler.handleChannelAdminDemotion(
              data,
              user,
              notifications
            );
            break;
          case RefreshEvents.CHANNEL_USER_INVIATION:
            RefreshEventsHandler.handleChannelUserInvitation(
              data,
              notifications
            );
            break;
          case RefreshEvents.CHANNEL_USER_BAN:
            RefreshEventsHandler.handleChannelUserBan(
              data,
              user,
              notifications,
              conversations
            );
            break;
          case RefreshEvents.CHANNEL_USER_UNBAN:
            RefreshEventsHandler.handleChannelUserUnban(
              data,
              user,
              notifications
            );
            break;
          case RefreshEvents.CHAT_CREATED:
            RefreshEventsHandler.handleChatCreated(data, notifications);
            break;
          case RefreshEvents.CHANNEL_USER_KICKED:
            RefreshEventsHandler.handleUserKicked(
              data,
              user,
              conversations,
              notifications
            );
            break;
          case RefreshEvents.GAME_INVITE_RESPONSE:
            RefreshEventsHandler.handleGameInviteResponse(data, game);
            break;
          case RefreshEvents.GAME_INVITE_SENT:
            RefreshEventsHandler.handleGameInviteSent(data, notifications);
            break;
        }
      }
    };
    socket.unsubscribe("refresh");
    socket.subscribe("refresh", callback);
  }

  static sendRefresh(
    socket: mySocket,
    studentId: string,
    event: RefreshEvents,
    friendStudentId?: string,
    type?: "CHAT" | "CHANNEL",
    name?: string,
    requestAccepted?: boolean
  ) {
    const data = {
      studentId: studentId,
      event: event,
      ...(type && { type: type }),
      ...(name && { name: name }),
      ...(friendStudentId && { friendStudentId: friendStudentId }),
      ...(requestAccepted !== undefined && { accepted: requestAccepted }),
    } as RefreshRequest;
    socket.send("refresh", data);
  }
}
