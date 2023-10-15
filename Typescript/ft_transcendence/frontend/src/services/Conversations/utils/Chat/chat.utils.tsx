import { Message } from "../..";
import { Data } from "../../../../common/Backend";
import { RefreshEvents, RefreshUtils } from "../../../../common/Refresh";
import { mySocket } from "../../../../common/Socket";
import { GameJoin, GameSelection } from "../../../Game";
import { ChatListItem } from "./chat.types";

export class ChatUtils {
  static async getChats(
    socket: mySocket,
    studentId: string
  ): Promise<Data<ChatListItem[]>> {
    const event = "chat/list";
    const body = {
      studentId: studentId,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async getChat(
    socket: mySocket,
    studentId: string,
    friendStudentId: string
  ): Promise<Data<ChatListItem>> {
    const event = "chat/get";
    const body = {
      users: {
        studentId: studentId,
        friendStudentId: friendStudentId,
      },
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async createChat(
    socket: mySocket,
    studentId: string,
    friendStudentId: string
  ): Promise<Data<ChatListItem>> {
    const event = "chat/create";
    const body = {
      users: {
        studentId: studentId,
        friendStudentId: friendStudentId,
      },
    };
    const res = (await socket.subscribeOnce(event, body)) as any;
    if (res.data)
      RefreshUtils.sendRefresh(
        socket,
        studentId,
        RefreshEvents.CHAT_CREATED,
        undefined,
        "CHAT",
        ChatUtils.getChatName(studentId, friendStudentId)
      );
    return res;
  }

  static async deleteChat(
    socket: mySocket,
    studentId: string,
    friendStudentId: string
  ): Promise<Response> {
    const event = "chat/delete";
    const body = {
      users: {
        studentId: studentId,
        friendStudentId: friendStudentId,
      },
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async getMessages(
    socket: mySocket,
    studentId: string,
    friendStudentId: string
  ): Promise<Data<Message[]> | Error> {
    const event = "chat/messages";
    const body = {
      users: {
        studentId: studentId,
        friendStudentId: friendStudentId,
      },
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }

  static async sendMessage(
    socket: mySocket,
    studentId: string,
    friendStudentId: string,
    content: string,
    isGame: boolean
  ): Promise<void> {
    const event = "chat/send";
    const body = {
      users: {
        studentId: studentId,
        friendStudentId: friendStudentId,
      },
      content: content,
      isGame: isGame,
    };
    await socket.subscribeOnce(event, body);
    RefreshUtils.sendRefresh(
      socket,
      studentId,
      RefreshEvents.MESSAGE_SENT,
      undefined,
      "CHAT",
      ChatUtils.getChatName(studentId, friendStudentId)
    );
  }

  static async sendGameInvite(
    socket: mySocket,
    studentId: string,
    friendStudentId: string,
    game: GameSelection
  ) {
    const event = "chat/send";
    const body = {
      users: {
        studentId: studentId,
        friendStudentId: friendStudentId,
      },
      content: JSON.stringify(game),
      isGame: true,
    };
    const res = await socket.subscribeOnce(event, body);
    RefreshUtils.sendRefresh(
      socket,
      studentId,
      RefreshEvents.GAME_INVITE_SENT,
      undefined,
      "CHAT",
      ChatUtils.getChatName(studentId, friendStudentId)
    );
    return res;
  }

  static async acceptGameInvite(
    socket: mySocket,
    studentId: string,
    message: Message
  ) {
    const event = "game/join";
    const selection = JSON.parse(message.content) as GameSelection;
    const body: GameJoin = {
      ...selection,
      studentId: message.from.studentId,
      on: "CHAT",
      whoJoinsStudentId: studentId,
      message: message,
    };
    const res = await socket.subscribeOnce(event, body);
    RefreshUtils.sendRefresh(
      socket,
      studentId,
      RefreshEvents.MESSAGE_DELETED,
      undefined,
      "CHAT",
      ChatUtils.getChatName(studentId, message.from.studentId)
    );
    return res;
  }

  static async doesChatExist(
    socket: mySocket,
    studentId: string,
    friendStudentId: string
  ): Promise<boolean> {
    const res = (await socket.subscribeOnce("chat/exists", {
      users: {
        studentId: studentId,
        friendStudentId: friendStudentId,
      },
    })) as any;
    if (res.error) return false;
    return res.data;
  }

  static getChatName(studentId: string, friendStudentId: string): string {
    return Number(studentId) > Number(friendStudentId)
      ? `${friendStudentId}-${studentId}`
      : `${studentId}-${friendStudentId}`;
  }

  static async deleteMessage(
    socket: mySocket,
    studentId: string,
    friendStudentId: string,
    content: string,
    createdAt: Date
  ): Promise<Response> {
    const event = "chat/delete/message";
    const body = {
      users: {
        studentId: studentId,
        friendStudentId: friendStudentId,
      },
      content: content,
      createdAt: createdAt,
    };
    return (await socket.subscribeOnce(event, body)) as any;
  }
}
