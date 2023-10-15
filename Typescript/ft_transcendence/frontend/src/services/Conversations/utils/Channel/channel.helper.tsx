import { ChannelListItem, ChannelUser, ChannelUtils, ConversationsHelper, ConversationsProps } from "../..";
import { ComponentsProps } from "../../../../common/Components";
import { RefreshEvents, RefreshUtils } from "../../../../common/Refresh";
import { mySocket } from "../../../../common/Socket";
import { NotificationsProps } from "../../../Notifications";
import { User, UserHelper, UserProps } from "../../../User";
import { ConversationListItemProps } from "../../components/conversation/conversation.listitem";
import { FriendListItemProps } from "../../components/new conversation/friend.listItem";

export class ChannelHelper {
  static async createChannel(
    socket: mySocket,
    notifications: NotificationsProps,
    conversations: ConversationsProps,
    components: ComponentsProps,
    channelName: string,
    avatar: string,
    user: UserProps,
    friends: User[],
    type: "PUBLIC" | "PRIVATE" | "PROTECTED",
    password: string
  ): Promise<void> {
    if (!user.studentId) return;
    const res = (await ChannelUtils.createChannel(
      socket,
      channelName,
      avatar,
      user.studentId,
      friends,
      type,
      password
    )) as any;
    if (res.data) {
      conversations.setCurrConversation({
        type: "CHANNEL",
        data: res.data as ChannelListItem,
      });
      notifications.setSuccessMessage("Channel created successfully");
      components.setDialogs({
        ...components.dialogs,
        connectChannelOpen: false,
      });
      conversations.setLocation("CHANNEL");
    } else notifications.setErrorMessage(res.error);
  }

  static async loadChannelMessages(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps
  ) {
    if (!socket || !user.studentId) return;
    const res = (await ChannelUtils.getMessages(
      socket,
      user.studentId,
      (conversations.currConversation.data as ChannelListItem).name
    )) as any;
    if (res.data) conversations.setMessages(res.data);
  }

  static async uploadAvatar(setAvatar: any) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (file) {
        const imageString = await UserHelper.convertImageToString(
          URL.createObjectURL(file)
        );
        setAvatar(imageString);
      }
    });
    input.click();
  }

  static async setDefaultAvatar(setAvatar: any) {
    const imageUrl = "./src/assets/group_avatar.png";
    const imageString = await UserHelper.convertImageToString(imageUrl);
    setAvatar(imageString);
  }

  static isFriendChoosed(props: FriendListItemProps) {
    if (!props.choosed) return false;
    return props.choosed.some(
      (friend) => friend.username === props.friend.username
    );
  }

  static setFriendChoosed(props: FriendListItemProps) {
    if (!props.setChoosed || !props.choosed) return;
    if (
      props.choosed.some((friend) => friend.username === props.friend.username)
    ) {
      props.setChoosed(
        props.choosed?.filter(
          (friend) => friend.username !== props.friend.username
        )
      );
    } else {
      props.setChoosed([...props.choosed, props.friend]);
    }
  }

  static async deleteMessage(
    socket: mySocket,
    studentId: string,
    channelName: string,
    content: string,
    createdAt: Date,
    notifications: NotificationsProps
  ) {
    const res = (await ChannelUtils.deleteMessage(
      socket,
      studentId,
      channelName,
      content,
      createdAt
    )) as any;
    if (res.success) {
      notifications.setSuccessMessage("Message deleted successfully");
      RefreshUtils.sendRefresh(
        socket,
        studentId,
        RefreshEvents.MESSAGE_DELETED,
        undefined,
        "CHANNEL",
        channelName
      );
    }
  }

  static async updateChannelUsers(
    socket: mySocket,
    conversations: ConversationsProps
  ) {
    if (conversations.location === "CHANNEL") {
      const res = (await ChannelUtils.getChannelUsers(
        socket,
        (conversations.currConversation.data as ChannelListItem).name
      )) as any;
      if (res.data) {
        let localUsers: ChannelUser[] = [];
        localUsers.push({ data: res.data.owner, role: "OWNER" });
        res.data.admins.forEach((admin: User) => {
          localUsers.push({ data: admin, role: "ADMIN" });
        });
        res.data.users.forEach((user: User) => {
          localUsers.push({ data: user, role: "USER" });
        });
        res.data.banned.forEach((banned: User) => {
          localUsers.push({ data: banned, role: "BANNED" });
        });
        res.data.muted.forEach((muted: User) => {
          localUsers.push({ data: muted, role: "MUTED" });
        });
        conversations.setChannelUsers(localUsers);
      }
    }
  }

  static async joinChannel(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps,
    components: ComponentsProps,
    notifications: NotificationsProps,
    props: ConversationListItemProps,
    setEnterProtected: React.Dispatch<React.SetStateAction<boolean>>,
    password?: string
  ) {
    if (props.protected && password === undefined)
      setEnterProtected((old) => !old);
    else {
      if (props.op === "NEW" && user.studentId) {
        const res = await ChannelUtils.joinChannel(
          socket,
          user.studentId,
          (props.data as ChannelListItem).name,
          password
        );
        if (res.error) {
          notifications.setErrorMessage(res.error);
          return;
        }
        components.setDialogs({
          ...components.dialogs,
          connectChannelOpen: false,
        });
        RefreshUtils.sendRefresh(
          socket,
          user.studentId,
          RefreshEvents.CHANNEL_JOINED,
          undefined,
          "CHANNEL",
          (props.data as ChannelListItem).name
        );
      }
      ConversationsHelper.goToConversation(props, conversations);
    }
  }

  static async leaveChannel(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps,
    notifications: NotificationsProps,
    components: ComponentsProps
  ) {
    if (user.studentId && conversations.location === "CHANNEL") {
      const res = (await ChannelUtils.leaveChannel(
        socket,
        user.studentId,
        (conversations.currConversation.data as ChannelListItem).name
      )) as any;
      if (res.success) {
        notifications.setSuccessMessage("Channel left successfully");
        conversations.setLocation("CONVERSATIONS");
        components.setDialogs({
          ...components.dialogs,
          channelProfileOpen: false,
        });
      } else {
        notifications.setErrorMessage(res.error);
      }
    }
  }

  static async kickUser(
    socket: mySocket,
    user: UserProps,
    friend: User,
    conversations: ConversationsProps,
    notifications: NotificationsProps
  ) {
    if (user.studentId && conversations.location === "CHANNEL") {
      const res = (await ChannelUtils.leaveChannel(
        socket,
        friend.studentId,
        (conversations.currConversation.data as ChannelListItem).name
      )) as any;
      if (res.success) {
        notifications.setSuccessMessage("User kicked successfully");
        RefreshUtils.sendRefresh(
          socket,
          user.studentId,
          RefreshEvents.CHANNEL_USER_KICKED,
          friend.studentId,
          "CHANNEL",
          (conversations.currConversation.data as ChannelListItem).name
        );
      } else {
        notifications.setErrorMessage(res.error);
      }
    }
  }

  static async updateChannel(
    socket: mySocket,
    user: UserProps,
    notifications: NotificationsProps,
    conversations: ConversationsProps,
    newChannelName: string,
    avatar: string,
    type: "PUBLIC" | "PRIVATE" | "PROTECTED",
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    password?: string
  ) {
    if (user.studentId) {
      const res = (await ChannelUtils.updateChannel(
        socket,
        user.studentId,
        (conversations.currConversation.data as ChannelListItem).name,
        newChannelName,
        avatar,
        type,
        password
      )) as any;
      if (res.error) {
        notifications.setErrorMessage(res.error);
      } else {
        conversations.setCurrConversation({
          type: "CHANNEL",
          data: res.data as ChannelListItem,
        });
        RefreshUtils.sendRefresh(
          socket,
          user.studentId,
          RefreshEvents.CHANNEL_UPDATED,
          undefined,
          "CHANNEL",
          newChannelName
        );
        setEditMode(false);
      }
    }
  }

  static async updateFriendsNotInChannel(
    socket: mySocket,
    user: UserProps,
    conversations: ConversationsProps,
    setFriendsNotInChannel: React.Dispatch<React.SetStateAction<User[]>>
  ) {
    if (user.studentId) {
      const res = (await ChannelUtils.getFriendsNotInChannel(
        socket,
        user.studentId,
        (conversations.currConversation.data as ChannelListItem).name
      )) as any;
      if (res.data) setFriendsNotInChannel(res.data);
    }
  }

  static async addFriends(
    socket: mySocket,
    user: UserProps,
    friends: User[],
    channelName: string,
    notifications: NotificationsProps,
    components: ComponentsProps
  ) {
    if (user.studentId) {
      const res = (await ChannelUtils.addUsers(
        socket,
        user.studentId,
        friends,
        channelName
      )) as any;
      if (res.error) {
        notifications.setErrorMessage(res.error);
      } else {
        notifications.setSuccessMessage("Friends added successfully");
        components.setDialogs({
          ...components.dialogs,
          channelProfileOpen: false,
        });
        RefreshUtils.sendRefresh(
          socket,
          user.studentId,
          RefreshEvents.CHANNEL_UPDATED,
          undefined,
          "CHANNEL",
          channelName
        );
      }
    }
  }

  static async ownerOperation(
    operation: "PROMOTE" | "DEMOTE",
    socket: mySocket,
    user: UserProps,
    channelName: string,
    friend: User,
    notifications: NotificationsProps
  ) {
    if (user.studentId) {
      const fun =
        operation === "PROMOTE"
          ? ChannelUtils.promoteUser
          : ChannelUtils.demoteAdmin;
      const successMessage =
        operation === "PROMOTE"
          ? "User promoted successfully"
          : "User demoted successfully";
      const event =
        operation === "PROMOTE"
          ? RefreshEvents.CHANNEL_ADMIN_PROMOTION
          : RefreshEvents.CHANNEL_ADMIN_DEMOTION;
      const res = (await fun(
        socket,
        user.studentId,
        channelName,
        friend.studentId
      )) as any;
      if (res.error) {
        notifications.setErrorMessage(res.error);
      } else {
        notifications.setSuccessMessage(successMessage);
        RefreshUtils.sendRefresh(
          socket,
          user.studentId,
          event,
          friend.studentId,
          "CHANNEL",
          channelName
        );
      }
    }
  }

  static async adminOperation(
    operation: "BAN" | "UNBAN" | "MUTE" | "UNMUTE",
    socket: mySocket,
    user: UserProps,
    channelName: string,
    friend: User,
    notifications: NotificationsProps,
    value?: number
  ) {
    let fun;
    let successMessage;
    let event;
    if (user.studentId) {
      switch (operation) {
        case "BAN":
          fun = ChannelUtils.banUser;
          successMessage = "User banned successfully";
          event = RefreshEvents.CHANNEL_USER_BAN;
          break;
        case "UNBAN":
          fun = ChannelUtils.unbanUser;
          successMessage = "User unbanned successfully";
          event = RefreshEvents.CHANNEL_USER_UNBAN;
          break;
        case "MUTE":
          fun = ChannelUtils.muteUser;
          successMessage = "User muted successfully";
          event = RefreshEvents.CHANNEL_USER_MUTED;
          break;
        case "UNMUTE":
          fun = ChannelUtils.unmuteUser;
          successMessage = "User unmuted successfully";
          event = RefreshEvents.CHANNEL_USER_UNMUTED;
          break;
      }
      const res = (await fun(
        socket,
        user.studentId,
        channelName,
        friend.studentId,
        value ? value : -1
      )) as any;
      if (res.error) {
        notifications.setErrorMessage(res.error);
      } else {
        notifications.setSuccessMessage(successMessage);
        RefreshUtils.sendRefresh(
          socket,
          user.studentId,
          event,
          friend.studentId,
          "CHANNEL",
          channelName
        );
      }
    }
  }
}
