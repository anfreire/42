import { Message } from "../..";
import { Data } from "../../../../common/Backend";
import { RefreshEvents, RefreshUtils } from "../../../../common/Refresh";
import { mySocket } from "../../../../common/Socket";
import { GameJoin, GameSelection } from "../../../Game";
import { User } from "../../../User";
import { ChannelListItem } from "./channel.types";

export class ChannelUtils {
  static async getChannels(
    socket: mySocket,
    studentId: string
  ): Promise<Data<ChannelListItem[]>> {
    const event = "channel/list";
    const body = {
      studentId: studentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async getChannel(socket: mySocket, studentId: string, id: number) {
    const event = "channel/get";
    const body = {
      id: id,
      studentId: studentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async getAvailableChannels(
    socket: mySocket,
    studentId: string
  ): Promise<Data<ChannelListItem[]>> {
    const event = "channel/available";
    const body = {
      studentId: studentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async getChannelUsers(
    socket: mySocket,
    channelName: string
  ): Promise<Data<User[]>> {
    const event = "channel/users";
    const body = {
      channelName: channelName,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async getMessages(
    socket: mySocket,
    studentId: string,
    channelName: string
  ): Promise<Data<Message[]>> {
    const event = "channel/messages";
    const body = {
      channelName: channelName,
      studentId: studentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async sendMessage(
    socket: mySocket,
    channelName: string,
    studentId: string,
    content: string,
    isGame: boolean
  ): Promise<void> {
    const event = "channel/send";
    const body = {
      channelName: channelName,
      from: studentId,
      content: content,
      isGame: isGame,
    };
    await socket.subscribeOnce(event, body);
    RefreshUtils.sendRefresh(
      socket,
      studentId,
      RefreshEvents.MESSAGE_SENT,
      undefined,
      "CHANNEL",
      channelName
    );
  }

  static async sendGameInvite(
    socket: mySocket,
    channelName: string,
    studentId: string,
    selection: GameSelection
  ) {
    const event = "channel/send";
    const body = {
      channelName: channelName,
      from: studentId,
      content: JSON.stringify(selection),
      isGame: true,
    };
    const res = await socket.subscribeOnce(event, body);
    RefreshUtils.sendRefresh(
      socket,
      studentId,
      RefreshEvents.GAME_INVITE_SENT,
      undefined,
      "CHANNEL",
      channelName
    );
    return res;
  }

  static async acceptGameInvite(
    socket: mySocket,
    studentId: string,
    message: Message,
    channelName: string
  ) {
    const event = "game/join";
    const selection = JSON.parse(message.content) as GameSelection;
    const body: GameJoin = {
      ...selection,
      studentId: message.from.studentId,
      on: "CHANNEL",
      whoJoinsStudentId: studentId,
      message: message,
    };
    const res = await socket.subscribeOnce(event, body);
    RefreshUtils.sendRefresh(
      socket,
      studentId,
      RefreshEvents.MESSAGE_DELETED,
      undefined,
      "CHANNEL",
      channelName
    );
    return res;
  }

  static async createChannel(
    socket: mySocket,
    channelName: string,
    avatar: string,
    studentId: string,
    users: User[],
    type: "PUBLIC" | "PRIVATE" | "PROTECTED",
    password: string
  ) {
    const usersStudentIds: string[] = users.map((user) => {
      return user.studentId;
    });
    const res = (await socket.subscribeOnce("channel/create", {
      name: channelName,
      owner: studentId,
      users: usersStudentIds,
      avatar: avatar,
      type: type,
      password: password,
    })) as any;
    if (res.data) {
      RefreshUtils.sendRefresh(
        socket,
        studentId,
        RefreshEvents.CHANNEL_CREATED,
        undefined,
        "CHANNEL",
        channelName
      );
    }
    return res;
  }

  static async deleteChannel(
    socket: mySocket,
    channelName: string,
    studentId: string
  ): Promise<Response> {
    return (await socket.subscribeOnce("channel/delete", {
      channelName: channelName,
      studentId: studentId,
    })) as Response;
  }

  static async deleteMessage(
    socket: mySocket,
    studentId: string,
    channelName: string,
    content: string,
    createdAt: Date
  ): Promise<Response> {
    const event = "channel/delete/message";
    const body = {
      channelName: channelName,
      studentId: studentId,
      content: content,
      createdAt: createdAt,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async joinChannel(
    socket: mySocket,
    studentId: string,
    channelName: string,
    password?: string
  ) {
    const event = "channel/join";
    const body = {
      studentId: studentId,
      channelName: channelName,
      ...(password && { password: password }),
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async leaveChannel(
    socket: mySocket,
    studentId: string,
    channelName: string
  ) {
    const event = "channel/leave";
    const body = {
      studentId: studentId,
      channelName: channelName,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async updateChannel(
    socket: mySocket,
    studentId: string,
    oldChannelName: string,
    newChannelName: string,
    avatar: string,
    type: "PUBLIC" | "PRIVATE" | "PROTECTED",
    password?: string
  ) {
    const event = "channel/update";
    const body = {
      studentId: studentId,
      oldChannelName: oldChannelName,
      newChannelName: newChannelName,
      avatar: avatar,
      type: type,
      ...(password && { password: password }),
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async getFriendsNotInChannel(
    socket: mySocket,
    studentId: string,
    channelName: string
  ) {
    const event = "channel/friends/notIn";
    const body = {
      studentId: studentId,
      channelName: channelName,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async addUsers(
    socket: mySocket,
    studentId: string,
    users: User[],
    channelName: string
  ): Promise<Response> {
    const event = "channel/add";
    const body = {
      studentId: studentId,
      users: users,
      channelName: channelName,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async promoteUser(
    socket: mySocket,
    studentId: string,
    channelName: string,
    friendStudentId: string
  ): Promise<Response> {
    const event = "channel/promote";
    const body = {
      studentId: studentId,
      channelName: channelName,
      friendStudentId: friendStudentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async demoteAdmin(
    socket: mySocket,
    studentId: string,
    channelName: string,
    friendStudentId: string
  ): Promise<Response> {
    const event = "channel/demote";
    const body = {
      studentId: studentId,
      channelName: channelName,
      friendStudentId: friendStudentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async banUser(
    socket: mySocket,
    studentId: string,
    channelName: string,
    friendStudentId: string
  ): Promise<Response> {
    const event = "channel/ban";
    const body = {
      studentId: studentId,
      channelName: channelName,
      friendStudentId: friendStudentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async unbanUser(
    socket: mySocket,
    studentId: string,
    channelName: string,
    friendStudentId: string
  ): Promise<Response> {
    const event = "channel/unban";
    const body = {
      studentId: studentId,
      channelName: channelName,
      friendStudentId: friendStudentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async muteUser(
    socket: mySocket,
    studentId: string,
    channelName: string,
    friendStudentId: string,
    value: number
  ): Promise<Response> {
    const event = "channel/mute";
    const body = {
      studentId: studentId,
      channelName: channelName,
      friendStudentId: friendStudentId,
      time: value,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async unmuteUser(
    socket: mySocket,
    studentId: string,
    channelName: string,
    friendStudentId: string
  ): Promise<Response> {
    const event = "channel/unmute";
    const body = {
      studentId: studentId,
      channelName: channelName,
      friendStudentId: friendStudentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }
}
