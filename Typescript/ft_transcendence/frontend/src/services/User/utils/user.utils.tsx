import { UserData, UserHelper, UserProps, UserState, UserStatus } from "..";
import { BackendUtils, Data, Error, Response } from "../../../common/Backend";
import { mySocket } from "../../../common/Socket";
import { Color } from "../../../common/Theme";
import { ConversationsHelper, ConversationsProps } from "../../Conversations";
import { GameListItem, GameProps } from "../../Game";
import { SocialHelper } from "../../Social";
import {
  FriendProfile,
  SocialProps,
} from "../../Social/context/social.context";

export class UserUtils {
  static saveAvatar(socket: mySocket, studentId: string, avatar: string) {
    socket.send("user/avatar/save", {
      studentId: studentId,
      avatar: avatar,
    });
  }

  static getAvatar(socket: mySocket, studentId: string, setAvatar: any) {
    const callback = (data: any) => {
      if (!data || !data.data) return;
      setAvatar(data.data);
      socket.unsubscribe("user/avatar/get");
    };
    socket.subscribe("user/avatar/get", callback);
    socket.send("user/avatar/get", { studentId: studentId });
  }

  static async getUserData(
    studentId: string,
    type: "LOGIN" | "EDIT"
  ): Promise<Data<UserData> | Error> {
    const res = (await BackendUtils.get(
      "user/get/" + studentId + "/" + type
    )) as any;
    return res;
  }

  static async getUser(
    studentId: string,
    friendStudentId: string,
    socket: mySocket
  ): Promise<Data<FriendProfile> | Error> {
    const res = (await socket.subscribeOnce("user/get", {
      studentId: studentId,
      friendStudentId: friendStudentId,
    })) as any;
    if (res.error || !res.data) return { error: "Failed to get user" };
    return res;
  }

  static async updateUserSocket(
    socket: mySocket,
    studentId: string
  ): Promise<Response> {
    if (!socket) return { error: "Missing socket" };
    else if (!studentId) return { error: "Missing studentId" };
    return (await BackendUtils.post("user/update/socket/" + studentId, {
      socket: socket.socket.id,
    })) as Response;
  }

  static async updateUserStatus(
    studentId: string | undefined,
    status: UserStatus | undefined
  ): Promise<void> {
    if (!studentId) return;
    else if (!status) return;
    await BackendUtils.post("user/update/status/" + studentId, {
      status: status,
    });
  }

  static async checkUsername(
    username: string,
    studentId: string
  ): Promise<boolean> {
    const oldUsername = (
      (await UserUtils.getUserData(studentId, "EDIT")) as any
    ).data.username;
    if (username === oldUsername) return true;
    const tmp = (await BackendUtils.get(
      "user/check/username/" + username
    )) as Response;
    return tmp.error ? false : true;
  }

  static async updateUserData(
    studentId: string,
    username: string,
    twoFA: string,
    color: Color,
    gmail?: string,
    phone?: string
  ): Promise<Response> {
    if (!studentId) return { error: "Missing studentId" };
    else if (!(await UserUtils.checkUsername(username, studentId)))
      return { error: "Username is not available" };
    const data = {
      studentId: studentId,
      color: color,
      username: username,
      twoFA: twoFA,
      gmail: gmail,
      phone: phone,
    };
    const res = (await BackendUtils.post(
      "user/update/" + studentId,
      data
    )) as any;
    return res;
  }

  static async getUserState(studentId: string): Promise<Data<UserState>> {
    return (await BackendUtils.get(
      "user/state/" + studentId
    )) as Data<UserState>;
  }

  static async registerUser(data: UserData): Promise<Response> {
    delete data.avatar;
    return (await BackendUtils.post("user/register", data)) as Response;
  }

  static async setDefaultAvatar(
    socket: mySocket,
    studentId: string,
    setAvatar: any
  ) {
    const imageUrl = "./src/assets/user_avatar.png";
    const imageString = await UserHelper.convertImageToString(imageUrl);
    setAvatar(imageString);
    UserUtils.saveAvatar(socket, studentId, imageString);
  }

  static async uploadAvatar(
    socket: mySocket,
    studentId: string,
    setAvatar: any
  ) {
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
        UserUtils.saveAvatar(socket, studentId, imageString);
      }
    });
    input.click();
  }

  static async onLogin(
    socket: mySocket,
    user: UserProps,
    social: SocialProps,
    conversations: ConversationsProps,
    game: GameProps
  ) {
    SocialHelper.updateFriends(socket, user, social);
    SocialHelper.updateFriendRequests(socket, user, social);
    ConversationsHelper.loadConversations(socket, user, conversations);
    const amIInGame = (await socket.subscribeOnce("game/amIInGame", {
      studentId: user.studentId,
    })) as Data<GameListItem | null>;
    if (amIInGame.data) {
      game.setCurrGame(amIInGame.data);
      game.setIsReconnecting(true);
      game.setLocation("GAME");
      game.setSelection({
        mode: amIInGame.data.mode,
        type: amIInGame.data.type,
        level: amIInGame.data.level,
      });
    }
  }

  static async block(
    studentId: string,
    friendStudentId: string
  ): Promise<Response> {
    return (await BackendUtils.post("user/block", {
      studentId: studentId,
      friendStudentId: friendStudentId,
    })) as Response;
  }
}
