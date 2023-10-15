import { BackendUtils } from "../../../common/Backend";
import { ComponentsProps } from "../../../common/Components";
import { NotificationsProps } from "../../Notifications";
import { UserProps } from "../../User";

export class AuthPhoneUtils {
  static async checkNumber(number: string): Promise<Response> {
    return (await BackendUtils.get("user/check/phone/" + number)) as Response;
  }

  static async getPhoneCodeSent(number: string): Promise<string> {
    return ((await BackendUtils.get("auth/phone/" + number)) as any).data;
  }

  static async sendSMS(
    user: UserProps,
    notifications: NotificationsProps,
    components: ComponentsProps,
    setCodeSent: React.Dispatch<React.SetStateAction<string>>,
    setCodeInput: React.Dispatch<React.SetStateAction<string>>
  ) {
    if (!components.dialogs.authOpen) {
      if (user.phone) {
        const check = (await AuthPhoneUtils.checkNumber(user.phone)) as any;
        if (check.error) {
          notifications.setErrorMessage(check.error);
          return;
        }
      }
    } else {
      if (!user.phone) {
        notifications.setErrorMessage("No phone number registered");
        return;
      }
    }
    const codeSent = await AuthPhoneUtils.getPhoneCodeSent(
      user.phone as string
    );
    setCodeSent(codeSent);
    notifications.setSuccessMessage("Code sent successfully to " + user.phone);
    components.setButtons({
      ...components.buttons,
      sendSMSDisabled: true,
      checkSMSCodeOpen: true,
    });
    setTimeout(() => {
      components.setButtons({
        ...components.buttons,
        sendSMSDisabled: false,
        checkSMSCodeOpen: false,
      });
      setCodeInput("");
    }, 60000);
  }

  static checkCode(
    user: UserProps,
    components: ComponentsProps,
    notifications: NotificationsProps,
    phoneInput: string,
    setCodeInput: React.Dispatch<React.SetStateAction<string>>,
    codeSent: string,
    codeInput: string
  ): void {
    if (codeInput !== codeSent) {
      notifications.setErrorMessage("Code is incorrect");
    } else {
      if (!components.dialogs.authOpen) {
        notifications.setSuccessMessage("2FA with phone number enabled");
        components.setButtons({
          ...components.buttons,
          sendSMSDisabled: true,
          twoFAPhoneChoiceDisabled: true,
          checkSMSCodeOpen: false,
        });
        setCodeInput("");
        user.setPhone(phoneInput);
      } else {
        notifications.setSuccessMessage(
          "Authenticated with phone number successfully"
        );
        components.setDialogs({
          ...components.dialogs,
          authOpen: false,
        });
        components.setButtons({
          ...components.buttons,
          sendSMSDisabled: false,
          checkSMSCodeOpen: false,
        });
      }
    }
  }
}
