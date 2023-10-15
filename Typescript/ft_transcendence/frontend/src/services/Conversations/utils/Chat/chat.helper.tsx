import {
  ChatListItem,
  ChatUtils,
  ConversationsProps,
  CurrentConversation,
} from "../..";
import { ComponentsProps } from "../../../../common/Components";
import { RefreshEvents, RefreshUtils } from "../../../../common/Refresh";
import { mySocket } from "../../../../common/Socket";
import { NotificationsProps } from "../../../Notifications";
import { User, UserProps } from "../../../User";

export class ChatHelper {
  static async loadChatMessages(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps
  ) {
    if (!socket || !user.studentId) return;
    const res = (await ChatUtils.getMessages(
      socket,
      user.studentId,
      (conversations.currConversation.data as ChatListItem).studentId
    )) as any;
    if (res.data) conversations.setMessages(res.data);
  }

  static async clickFriend(
    conversations: ConversationsProps,
    user: UserProps,
    socket: mySocket,
    components: ComponentsProps,
    friend: User
  ) {
    if (!user.studentId) return;
    const ans = await ChatUtils.doesChatExist(
      socket,
      user.studentId,
      friend.studentId
    );
    const localCurrChat: CurrentConversation = {
      type: "CHAT",
      data: {
        username: friend.username,
        avatar: friend.avatar,
        status: friend.status,
        studentId: friend.studentId,
        createdAt: new Date(),
        lastSeenMessages: 0,
      } as ChatListItem,
    };
    if (ans !== true) {
      await ChatUtils.createChat(socket, user.studentId, friend.studentId);
    }
    components.setDialogs({
      ...components.dialogs,
      chatWithFriendOpen: false,
      profileOpen: false,
      channelProfileOpen: false,
    });
    conversations.setLocation("CHAT");
    conversations.setCurrConversation(localCurrChat);
  }

  static async deleteMessage(
    socket: mySocket,
    studentId: string,
    friendStudentId: string,
    content: string,
    createdAt: Date,
    notifications: NotificationsProps
  ) {
    const res = (await ChatUtils.deleteMessage(
      socket,
      studentId,
      friendStudentId,
      content,
      createdAt
    )) as any;
    if (res.error) return;
    notifications.setSuccessMessage("Message deleted successfully");
    RefreshUtils.sendRefresh(
      socket,
      studentId,
      RefreshEvents.MESSAGE_DELETED,
      friendStudentId,
      "CHAT",
      ChatUtils.getChatName(studentId, friendStudentId)
    );
  }
}
