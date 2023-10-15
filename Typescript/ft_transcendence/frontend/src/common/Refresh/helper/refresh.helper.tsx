import { RefreshMessages, RefreshResponse } from "..";
import {
  ChannelHelper,
  ChannelListItem,
  ChannelUtils,
  ChatHelper,
  ChatListItem,
  ChatUtils,
  ConversationsHelper,
  ConversationsProps,
} from "../../../services/Conversations";
import { SocialHelper, SocialProps } from "../../../services/Social";
import { UserProps, UserUtils } from "../../../services/User";
import { mySocket } from "../../Socket";

export class RefreshHelper {
  static async updateMessages(
    data: RefreshResponse,
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps
  ) {
    data.request = data.request as RefreshMessages;
    if (user.studentId) {
      if (conversations.location === "CHAT") {
        ChatHelper.loadChatMessages(socket, user, conversations);
      } else if (conversations.location === "CHANNEL") {
        ChannelHelper.loadChannelMessages(socket, user, conversations);
      }
    }
  }

  static async updateFriendsList(
    socket: mySocket,
    user: UserProps,
    social: SocialProps
  ) {
    SocialHelper.updateFriends(socket, user, social);
  }

  static async updateFriendRequests(
    socket: mySocket,
    user: UserProps,
    social: SocialProps
  ) {
    SocialHelper.updateFriendRequests(socket, user, social);
  }

  static async updateProfile(
    socket: mySocket,
    user: UserProps,
    social: SocialProps
  ) {
    if (!user.studentId || !social.friendProfile) return;
    const localProfile = (await UserUtils.getUser(
      user.studentId,
      social.friendProfile.studentId,
      socket
    )) as any;
    if (localProfile.error) return;
    else social.setFriendProfile(localProfile.data);
  }

  static async updateChannelUsers(
    socket: mySocket,
    conversations: ConversationsProps
  ) {
    await ChannelHelper.updateChannelUsers(socket, conversations);
  }

  static async updateConversations(
    user: UserProps,
    conversations: ConversationsProps,
    socket: mySocket
  ) {
    ConversationsHelper.loadConversations(socket, user, conversations);
  }

  static async updateCurrConversation(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps
  ) {
    if (!user.studentId || conversations.currConversation.type === "NONE")
      return;
    if (conversations.currConversation.type === "CHANNEL") {
      const channel = (await ChannelUtils.getChannel(
        socket,
        user.studentId,
        (conversations.currConversation.data as ChannelListItem).id
      )) as any;
      if (channel.error) return;
      else
        conversations.setCurrConversation({
          ...conversations.currConversation,
          data: channel.data,
        });
    } else if (conversations.currConversation.type === "CHAT") {
      const chat = (await ChatUtils.getChat(
        socket,
        user.studentId,
        (conversations.currConversation.data as ChatListItem).studentId
      )) as any;
      if (chat.error) return;
      else
        conversations.setCurrConversation({
          ...conversations.currConversation,
          data: chat.data,
        });
    }
  }

  static updateBlockedUsers(
    socket: mySocket,
    user: UserProps,
    social: SocialProps
  ) {
    if (!user.studentId) return;
    SocialHelper.loadBlockedUsers(socket, user.studentId, social);
  }

  static updateAchievements(socket: mySocket, user: UserProps) {
    const body = {
      studentId: user.studentId,
    };
    const event = "update/achievements";
    socket.subscribeOnce(event, body).then((res) => {
      if ((res as any).data) {
        user.setAchievements((res as any).data);
      }
    });
  }
}
