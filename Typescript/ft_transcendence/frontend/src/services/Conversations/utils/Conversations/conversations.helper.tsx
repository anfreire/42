import {
  BothListItem,
  ChannelHelper,
  ChannelListItem,
  ChannelUtils,
  ChatHelper,
  ChatListItem,
  ChatUtils,
  ConversationsProps,
  Message,
} from "../..";
import { mySocket } from "../../../../common/Socket";
import { UserProps } from "../../../User";
import { ConversationListItemProps } from "../../components/conversation/conversation.listitem";
import {
  CurrentConversation,
  NoneConversation,
} from "../../context/conversations.context";
import { FriendListItemProps } from "../../components/new conversation/friend.listItem";
import { ComponentsProps } from "../../../../common/Components";
import { NotificationsProps } from "../../../Notifications";
import { GameProps, GameSelection } from "../../../Game";

export class ConversationsHelper {
  static handleBarBackButton(conversations: ConversationsProps) {
    conversations.setLocation("CONVERSATIONS");
    conversations.setCurrConversation(NoneConversation);
  }

  static getBarTitle(
    location:
      | "CONVERSATIONS"
      | "CHANNEL"
      | "CHAT"
      | "NEW_CONVERSATION"
      | "NEW_CHAT"
      | "NEW_CHANNEL"
      | "JOIN_CHANNEL",
    name?: string
  ) {
    switch (location) {
      case "CONVERSATIONS":
      case "NEW_CHAT":
      case "NEW_CHANNEL":
      case "JOIN_CHANNEL":
        return "Conversations";
      case "CHANNEL":
        return name || "Group Chat";
      case "CHAT":
        return name || "Friend Chat";
      case "NEW_CONVERSATION":
        return "Start a conversation";
    }
  }

  static async loadMessages(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps
  ) {
    if (!socket || !user.studentId) return;
    if (conversations.currConversation.type === "CHANNEL") {
      ChannelHelper.loadChannelMessages(socket, user, conversations);
    } else if (conversations.currConversation.type === "CHAT") {
      ChatHelper.loadChatMessages(socket, user, conversations);
    }
  }

  static goToConversation(
    props: ConversationListItemProps,
    conversations: ConversationsProps
  ) {
    const localCurrChat: CurrentConversation = {
      type: props.type,
      data: props.data,
    };
    conversations.setCurrConversation(localCurrChat);
    if (props.type === "CHANNEL" || props.type === "CHAT")
      conversations.setLocation(props.type);
  }

  static async loadConversations(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps
  ) {
    if (user.studentId) {
      const channels = await ChannelUtils.getChannels(socket, user.studentId);
      const chats = await ChatUtils.getChats(socket, user.studentId);
      let localBoth: BothListItem[] = [];
      chats.data.forEach((chat: ChatListItem) => {
        localBoth.push({
          data: chat,
          type: "CHAT",
        });
      });
      channels.data.forEach((channel: ChannelListItem) => {
        localBoth.push({
          data: channel,
          type: "CHANNEL",
        });
      });
      localBoth.sort((a, b) => {
        const timeA = new Date(a.data.createdAt);
        const timeB = new Date(b.data.createdAt);
        return timeB.getTime() - timeA.getTime();
      });
      conversations.setConversations(localBoth);
    }
  }

  static async handleFriendClicked(
    socket: mySocket,
    conversations: ConversationsProps,
    user: UserProps,
    components: ComponentsProps,
    props: FriendListItemProps
  ) {
    if (conversations.location === "NEW_CHAT") {
      ChatHelper.clickFriend(
        conversations,
        user,
        socket,
        components,
        props.friend
      );
    } else if (conversations.location === "NEW_CHANNEL") {
      ChannelHelper.setFriendChoosed(props);
    }
  }

  static isSpace(str: string) {
    return str.trim().length === 0;
  }

  static sendMessage(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps,
    setMessage: (message: string) => void,
    message: string
  ) {
    if (!user.studentId || !socket.socket) return;
    if (!this.isSpace(message)) {
      conversations.currConversation.type == "CHANNEL"
        ? ChannelUtils.sendMessage(
            socket,
            (conversations.currConversation.data as ChannelListItem).name,
            user.studentId,
            message,
            false
          )
        : ChatUtils.sendMessage(
            socket,
            user.studentId,
            (conversations.currConversation.data as ChatListItem).studentId,
            message,
            false
          );
      setMessage("");
    }
  }

  static async sendGameInvite(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps,
    game: GameProps,
    notifications: NotificationsProps
  ) {
    if (!user.studentId || !socket.socket) return;
    const res =
      conversations.currConversation.type == "CHANNEL"
        ? ((await ChannelUtils.sendGameInvite(
            socket,
            (conversations.currConversation.data as ChannelListItem).name,
            user.studentId,
            game.selection as GameSelection
          )) as any)
        : ((await ChatUtils.sendGameInvite(
            socket,
            user.studentId,
            (conversations.currConversation.data as ChatListItem).studentId,
            game.selection as GameSelection
          )) as any);
    if (res.error) {
      notifications.setErrorMessage(res.error);
    }
    game.setSelection({
      mode: undefined,
      type: undefined,
      level: undefined,
    });
  }

  static async acceptGameInvite(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps,
    message: Message,
    game: GameProps,
    notifications: NotificationsProps
  ) {
    if (!user.studentId || !socket.socket) return;
    const res =
      conversations.currConversation.type == "CHANNEL"
        ? ((await ChannelUtils.acceptGameInvite(
            socket,
            user.studentId,
            message,
            (conversations.currConversation.data as ChannelListItem).name
          )) as any)
        : ((await ChatUtils.acceptGameInvite(
            socket,
            user.studentId,
            message
          )) as any);

    if (res.error) {
      notifications.setErrorMessage(res.error);
      return;
    }
    game.setCurrGame(res.data);
    game.setSelection(JSON.parse(message.content) as GameSelection);
    game.setIsWatching(false);
    game.setLocation("GAME");
  }

  static deleteMessage(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps,
    notifications: NotificationsProps,
    data: Message
  ) {
    if (!user.studentId) return;
    if (conversations.location === "CHAT") {
      ChatHelper.deleteMessage(
        socket,
        user.studentId,
        (conversations.currConversation.data as ChatListItem).studentId,
        data.content,
        data.createdAt,
        notifications
      );
    } else if (conversations.location === "CHANNEL") {
      ChannelHelper.deleteMessage(
        socket,
        user.studentId,
        (conversations.currConversation.data as ChannelListItem).name,
        data.content,
        data.createdAt,
        notifications
      );
    }
  }
}
