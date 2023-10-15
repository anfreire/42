import { BackendUtils, Data, Error, Response } from "../../../common/Backend";
import { mySocket } from "../../../common/Socket";
import { User } from "../../User";

export class SocialUtils {
  static async getFriendList(
    socket: mySocket,
    studentId: string
  ): Promise<Data<User[]> | Error> {
    return (await socket.subscribeOnce("user/friends/list", {
      studentId: studentId,
    })) as any;
  }

  static async getFriendRequests(
    socket: mySocket,
    studentId: string
  ): Promise<Data<User[]> | Error> {
    return (await socket.subscribeOnce("user/friendRequests/list", {
      studentId: studentId,
    })) as any;
  }

  static async sendFriendRequest(
    studentId: string,
    friendStudentId: string
  ): Promise<Response> {
    return (await BackendUtils.post("user/friendRequests/send", {
      studentId: studentId,
      friendStudentId: friendStudentId,
    })) as Response;
  }

  static async declineFriendRequest(
    studentId: string,
    friendStudentId: string
  ): Promise<Response> {
    return (await BackendUtils.post("user/friendRequests/decline", {
      studentId: studentId,
      friendStudentId: friendStudentId,
    })) as Response;
  }

  static async acceptFriendRequest(
    studentId: string,
    friendStudentId: string
  ): Promise<Response> {
    return (await BackendUtils.post("user/friendRequests/accept", {
      studentId: studentId,
      friendStudentId: friendStudentId,
    })) as Response;
  }

  static async removeFriend(
    studentId: string,
    friendStudentId: string
  ): Promise<Response> {
    return (await BackendUtils.post("user/friends/remove", {
      studentId: studentId,
      friendStudentId: friendStudentId,
    })) as Response;
  }

  static async getBlockedUsers(
    socket: mySocket,
    studentId: string
  ): Promise<Data<User[]> | Error> {
    return (await socket.subscribeOnce("user/blocked/list", {
      studentId: studentId,
    })) as any;
  }

  static async getLeaderboard(socket: mySocket) {
    const res = ((await socket.subscribeOnce("leaderboard", {})) as any).data;
    return res;
  }
}
