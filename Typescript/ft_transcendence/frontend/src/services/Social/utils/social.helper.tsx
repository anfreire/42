import { SocialProps, SocialUtils } from "..";
import { ComponentsProps } from "../../../common/Components";
import { RefreshEvents, RefreshUtils } from "../../../common/Refresh";
import { mySocket } from "../../../common/Socket";
import { NotificationsProps } from "../../Notifications";
import { User, UserProps, UserUtils } from "../../User";

export class SocialHelper {
  static async updateFriendRequests(
    socket: mySocket,
    user: UserProps,
    social: SocialProps
  ) {
    if (user.studentId) {
      const localFriendRequests = (await SocialUtils.getFriendRequests(
        socket,
        user.studentId
      )) as any;
      if (localFriendRequests.data)
        social.setFriendRequests(localFriendRequests.data);
    }
  }

  static async updateFriends(
    socket: mySocket,
    user: UserProps,
    social: SocialProps
  ) {
    if (user.studentId) {
      const localFriends = (await SocialUtils.getFriendList(
        socket,
        user.studentId
      )) as any;
      if (localFriends.data) social.setFriends(localFriends.data);
    }
  }

  static async acceptFriendRequest(
    socket: mySocket,
    user: UserProps,
    notifications: NotificationsProps,
    friend: User
  ) {
    if (user.studentId && friend.studentId) {
      const res = (await SocialUtils.acceptFriendRequest(
        user.studentId,
        friend.studentId
      )) as any;
      if (res.error) notifications.setErrorMessage(res.error);
      else {
        RefreshUtils.sendRefresh(
          socket,
          user.studentId,
          RefreshEvents.FRIEND_REQUEST_RESPONSE,
          friend.studentId,
          undefined,
          undefined,
          true
        );
        notifications.setSuccessMessage(res.success);
      }
    }
  }

  static async declineFriendRequest(
    socket: mySocket,
    user: UserProps,
    notifications: NotificationsProps,
    friend: User
  ) {
    if (user.studentId && friend.studentId) {
      const res = (await SocialUtils.declineFriendRequest(
        user.studentId,
        friend.studentId
      )) as any;
      if (res.error) notifications.setErrorMessage(res.error);
      else {
        RefreshUtils.sendRefresh(
          socket,
          user.studentId,
          RefreshEvents.FRIEND_REQUEST_RESPONSE,
          friend.studentId,
          undefined,
          undefined,
          false
        );
        notifications.setSuccessMessage(res.success);
      }
    }
  }

  static async sendFriendRequest(
    socket: mySocket,
    user: UserProps,
    social: SocialProps,
    notifications: NotificationsProps
  ) {
    if (user.studentId && social.friendProfile) {
      const res = (await SocialUtils.sendFriendRequest(
        user.studentId,
        social.friendProfile.studentId
      )) as any;
      if (res.error) {
        notifications.setErrorMessage(res.error);
        return;
      }
      RefreshUtils.sendRefresh(
        socket,
        user.studentId,
        RefreshEvents.FRIEND_REQUEST_SENT,
        social.friendProfile.studentId
      );
      notifications.setSuccessMessage(res.success as string);
    }
  }

  static async handleFriendAvatarClick(
    socket: mySocket,
    user: UserProps,
    friend: User,
    social: SocialProps,
    components: ComponentsProps
  ) {
    if (!user.studentId || !friend.studentId) return;
    const localProfile = (await UserUtils.getUser(
      user.studentId,
      friend.studentId,
      socket
    )) as any;
    if (localProfile.error) return;
    else social.setFriendProfile(localProfile.data);
    components.setDialogs({
      ...components.dialogs,
      profileOpen: true,
    });
    components.setDrawers({
      ...components.drawers,
      leftOpen: false,
    });
  }

  static async removeFriendHandler(
    socket: mySocket,
    studentId: string,
    friendStudentId: string,
    notifications: NotificationsProps
  ) {
    const res = (await SocialUtils.removeFriend(
      studentId,
      friendStudentId
    )) as any;
    if (res.error) notifications.setErrorMessage(res.error);
    else notifications.setSuccessMessage(res.success);
    RefreshUtils.sendRefresh(
      socket,
      studentId,
      RefreshEvents.FRIEND_REMOVED,
      friendStudentId
    );
  }

  static async blockFriendHandler(
    socket: mySocket,

    notifications: NotificationsProps,
    user: UserProps,
    social: SocialProps
  ) {
    const res = (await UserUtils.block(
      user.studentId as string,
      social.friendProfile?.studentId as string
    )) as any;
    if (res.error) notifications.setErrorMessage(res.error);
    else notifications.setSuccessMessage(res.success);
    RefreshUtils.sendRefresh(
      socket,
      user.studentId as string,
      RefreshEvents.USER_BLOCKED,
      social.friendProfile?.studentId as string
    );
  }

  static async loadBlockedUsers(
    socket: mySocket,
    studentId: string,
    social: SocialProps
  ) {
    const res = (await SocialUtils.getBlockedUsers(socket, studentId)) as any;
    if (res.error) return;
    else social.setBlockedUsers(res.data);
  }
}
