import { BackendUtils } from "../../../common/Backend";
import { mySocket } from "../../../common/Socket";
import { UserProps, UserState, UserUtils } from "../../User";
import { NotificationsProps } from "../../Notifications";
import { ComponentsProps } from "../../../common/Components";
import { RefreshEvents, RefreshUtils } from "../../../common/Refresh";

export class Auth42Utils {
  public static readonly url: string = import.meta.env.VITE_42_URL;

  static extract(url: string | undefined): string | null {
    if (!url) return null;
    return new URL(url).searchParams.get("code");
  }

  static removeLocalStorage() {
    localStorage.removeItem("auth42");
  }

  static openPopup(
    setCode: React.Dispatch<React.SetStateAction<string | undefined>>
  ) {
    const eventListener = () => {
      const localCode = localStorage.getItem("auth42");
      if (localCode) {
        const parsedCode = JSON.parse(localCode);
        if (parsedCode.code) {
          setCode(parsedCode.code);
          Auth42Utils.removeLocalStorage();
          window.removeEventListener("storage", eventListener);
        }
      }
    };
    window.open(Auth42Utils.url, "42 Login", "width=500,height=600");
    window.addEventListener("storage", eventListener);
  }

  static handleURL(url: string): void {
    const code = Auth42Utils.extract(url);
    if (!code) return;
    localStorage.setItem("auth42", JSON.stringify({ code: code }));
    window.close();
  }

  static async getStudentId(code: string): Promise<string> {
    return ((await BackendUtils.get("auth/42/" + code)) as any).data.toString();
  }

  static async handleAuthSuccess(
    socket: mySocket,
    user: UserProps,
    components: ComponentsProps,
    notifications: NotificationsProps
  ): Promise<void> {
    if (!user || !user.studentId) return;
    const state = await UserUtils.getUserState(user.studentId);
    switch (state.data) {
      case UserState.UNKNOW:
        notifications.setErrorMessage("Comunication with server failed");
        break;
      case UserState.UNREGISTERED:
        components.setDialogs({
          ...components.dialogs,
          registerOpen: true,
          authOpen: false,
        });
        break;
      case UserState.REGISTERED:
        const userData = (await UserUtils.getUserData(
          user.studentId,
          "LOGIN"
        )) as any;
        if (userData.error) notifications.setErrorMessage(userData.error);
        else {
          UserUtils.getAvatar(socket, user.studentId, user.setAvatar);
          user.setSocket(socket.socket.id);
          user.setUsername(userData.data.username);
          user.setTwoFA(userData.data.twoFA);
          user.setGmail(userData.data.gmail);
          user.setPhone(userData.data.phone);
          user.setColor(userData.data.color);
          user.setAchievements(userData.data.achievements);
        }
    }
  }

  static handleDataRecieved(
    socket: mySocket,
    user: UserProps,
    components: ComponentsProps
  ): void {
    if (!user || !user.avatar || !user.twoFA || !user.studentId) return;
    UserUtils.updateUserStatus(user.studentId, "ONLINE");
    UserUtils.updateUserSocket(socket, user.studentId);
    RefreshUtils.sendRefresh(
      socket,
      user.studentId,
      RefreshEvents.STATUS_CHANGE
    );
    user.setStatus("ONLINE");
    switch (user.twoFA) {
      case "NONE":
        components.setDialogs({
          ...components.dialogs,
          authOpen: false,
        });
        break;
      case "GOOGLE":
        components.setCollapse({
          ...components.collapse,
          authGoogleOpen: true,
        });
        components.setButtons({
          ...components.buttons,
          auth42Disabled: true,
        });
        break;
      case "PHONE":
        components.setCollapse({
          ...components.collapse,
          authPhoneOpen: true,
        });
        components.setButtons({
          ...components.buttons,
          auth42Disabled: true,
        });
        break;
    }
  }
}
