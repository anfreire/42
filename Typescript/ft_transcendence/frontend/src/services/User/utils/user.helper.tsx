import { UserProps, UserUtils } from "..";
import { ComponentsProps } from "../../../common/Components";
import { RefreshEvents, RefreshUtils } from "../../../common/Refresh";
import { mySocket } from "../../../common/Socket";
import { Color } from "../../../common/Theme";
import { ConversationsProps } from "../../Conversations";
import { GameProps } from "../../Game";
import { NotificationsProps } from "../../Notifications";
import { SocialProps } from "../../Social";

export class UserHelper {
  static will2FAChangeCauseDataLoss(
    newChoice: "NONE" | "GOOGLE" | "PHONE",
    user: UserProps
  ): boolean {
    if (newChoice != user.twoFA) {
      if (user.twoFA === "GOOGLE" && user.gmail && user.gmail.length > 0) {
        return true;
      } else if (
        user.twoFA === "PHONE" &&
        user.phone &&
        user.phone.length > 0
      ) {
        return true;
      }
    }
    return false;
  }

  static handle2FAChange(
    newChoice: "NONE" | "GOOGLE" | "PHONE",
    user: UserProps,
    components: ComponentsProps,
    notifications: NotificationsProps,
    showWarning: boolean,
    setShowWarning: React.Dispatch<React.SetStateAction<boolean>>
  ): void {
    if (UserHelper.will2FAChangeCauseDataLoss(newChoice, user)) {
      if (showWarning) {
        const warning =
          "If you proceed to change the 2FA method, you will loose the saved" +
          (user.twoFA === "GOOGLE" ? " Google account" : " phone number");
        notifications.setWarningMessage(warning);
        setShowWarning(false);
        return;
      }
      user.setGmail(undefined);
      user.setPhone(undefined);
      components.setButtons({
        ...components.buttons,
        authGoogleDisabled: false,
        twoFAGoogleChoiceDisabled: false,
        twoFAPhoneChoiceDisabled: false,
        sendSMSDisabled: false,
      });
    }
    components.setButtonGroups({
      ...components.buttonGroups,
      twoFAChoice: newChoice,
    });
    user.setTwoFA(newChoice);
    if (newChoice == "GOOGLE") {
      components.setCollapse({
        ...components.collapse,
        authGoogleOpen: true,
        authPhoneOpen: false,
      });
    } else if (newChoice == "PHONE") {
      components.setCollapse({
        ...components.collapse,
        authGoogleOpen: false,
        authPhoneOpen: true,
      });
    } else {
      components.setCollapse({
        ...components.collapse,
        authGoogleOpen: false,
        authPhoneOpen: false,
      });
    }
    setShowWarning(true);
  }

  static restoreUser2FAOption(components: ComponentsProps, user: UserProps) {
    if (components.dialogs.registerOpen) {
      components.setButtonGroups({
        ...components.buttonGroups,
        twoFAChoice: "NONE",
      });
      user.setTwoFA("NONE");
    } else if (components.dialogs.editOpen && user.twoFA) {
      components.setButtonGroups({
        ...components.buttonGroups,
        twoFAChoice: user.twoFA,
      });
      if (user.twoFA == "GOOGLE") {
        components.setButtons({
          ...components.buttons,
          twoFAGoogleChoiceDisabled: true,
          authGoogleDisabled: true,
        });
      } else if (user.twoFA == "PHONE") {
        components.setButtons({
          ...components.buttons,
          twoFAPhoneChoiceDisabled: true,
          sendSMSDisabled: true,
        });
      }
    }
  }

  static async convertImageToString(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();
    const image = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        image.onload = () => {
          const size = Math.min(image.width, image.height);
          canvas.width = size;
          canvas.height = size;
          ctx?.drawImage(
            image,
            (image.width - size) / 2,
            (image.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          );
          const resizedCanvas = document.createElement("canvas");
          const resizedCtx = resizedCanvas.getContext("2d");
          resizedCanvas.width = 420;
          resizedCanvas.height = 420;
          resizedCtx?.drawImage(canvas, 0, 0, size, size, 0, 0, 420, 420);
          resolve(resizedCanvas.toDataURL());
        };
        image.onerror = () => {
          reject(new Error("Failed to load image"));
        };
        image.src = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
  }

  static async registerUser(
    input: string,
    color: Color,
    user: UserProps,
    notifications: NotificationsProps,
    components: ComponentsProps,
    socket: mySocket,
    social: SocialProps,
    conversations: ConversationsProps,
    game: GameProps
  ) {
    if (!UserHelper.checkUsernameCharacters(input)) {
      notifications.setErrorMessage(
        "Username must contain only letters, numbers and underscores"
      );
      return;
    }
    const data = {
      socket: socket.socket.id,
      color: color,
      twoFA: user.twoFA,
      username: input,
      studentId: user.studentId?.toString(),
      gmail: user.gmail,
      phone: user.phone,
    };
    const res = await UserUtils.registerUser(data);
    if (res["error"]) {
      notifications.setErrorMessage(res["error"]);
    } else {
      user.setUsername(input);
      user.setColor(color);
      notifications.setSuccessMessage("User registered successfully");
      components.setDialogs({
        ...components.dialogs,
        registerOpen: false,
      });
      await UserUtils.updateUserStatus(user.studentId, "ONLINE");
      user.setStatus("ONLINE");
      RefreshUtils.sendRefresh(
        socket,
        user.studentId as string,
        RefreshEvents.STATUS_CHANGE
      );
      await UserUtils.onLogin(socket, user, social, conversations, game);
    }
  }

  static checkUsernameCharacters(username: string) {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
  }

  static async editUser(
    input: string,
    color: Color,
    user: UserProps,
    notifications: NotificationsProps,
    components: ComponentsProps,
    socket: mySocket
  ) {
    if (!user.studentId || !user.username || !user.twoFA) {
      notifications.setErrorMessage("Failed to edit user");
      return;
    }
    if (!UserHelper.checkUsernameCharacters(input)) {
      notifications.setErrorMessage(
        "Username must contain only letters, numbers and underscores"
      );
      return;
    }
    const res = await UserUtils.updateUserData(
      user.studentId,
      input,
      user.twoFA,
      color,
      user.gmail,
      user.phone
    );
    if (res["error"]) {
      notifications.setErrorMessage(res["error"]);
    } else {
      user.setUsername(input);
      user.setColor(color);
      notifications.setSuccessMessage("User edited successfully");
      RefreshUtils.sendRefresh(
        socket,
        user.studentId,
        RefreshEvents.AVATAR_CHANGE
      );
      components.setDialogs({
        ...components.dialogs,
        editOpen: false,
      });
      components.setButtons({
        ...components.buttons,
        twoFAGoogleChoiceDisabled: false,
        twoFANoneChoiceDisabled: false,
        twoFAPhoneChoiceDisabled: false,
        authGoogleDisabled: false,
        sendSMSDisabled: false,
        checkSMSCodeOpen: false,
      });
    }
  }

  static init(socket: mySocket) {
    const close = () => {
      socket.socket.close();
      window.location.reload();
    };
    socket.subscribe("closeOnCommand", () => {
      close();
    });
  }

  static onClose(socket: mySocket) {
    socket.unsubscribe("closeOnCommand");
  }
}
