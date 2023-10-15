import { BackendUtils } from "../../../common/Backend";
import { ComponentsProps } from "../../../common/Components";
import { NotificationsProps } from "../../Notifications";
import { UserProps } from "../../User";

export class AuthGoogleUtils {
  public static readonly url: string = import.meta.env.VITE_GOOGLE_URL;

  static removeLocalStorage() {
    localStorage.removeItem("authGoogle");
  }

  static openPopup(setTokens: React.Dispatch<React.SetStateAction<any>>): void {
    // Event listener for popup
    const eventListener = () => {
      const localTokens = localStorage.getItem("authGoogle");
      if (localTokens) {
        const parsedTokens = JSON.parse(localTokens);
        if (parsedTokens.access_token && parsedTokens.token_type)
          setTokens({
            token_type: parsedTokens["token_type"],
            access_token: parsedTokens["access_token"],
          });
        AuthGoogleUtils.removeLocalStorage();
        window.removeEventListener("storage", eventListener);
      }
    };
    window.open(AuthGoogleUtils.url, "Google Login", "width=500,height=600");
    window.addEventListener("storage", eventListener);
  }

  static handleURL(url: string) {
    const tokens = AuthGoogleUtils.extract(url);
    if (tokens && tokens.access_token && tokens.token_type) {
      localStorage.setItem("authGoogle", JSON.stringify(tokens));
      window.close();
    }
  }

  static async handleTokens(
    tokens: any,
    user: UserProps,
    components: ComponentsProps,
    notifications: NotificationsProps
  ) {
    if (!tokens || !tokens.token_type || !tokens.access_token) return;
    const gmail = await AuthGoogleUtils.getGmail(
      tokens.token_type,
      tokens.access_token
    );
    if (gmail && !components.dialogs.authOpen) {
      user.setGmail(gmail);
      components.setButtons({
        ...components.buttons,
        authGoogleDisabled: true,
        twoFAGoogleChoiceDisabled: true,
      });
      notifications.setSuccessMessage("2FA with Google enabled successfully");
    } else {
      if (user.gmail && user.gmail == gmail) {
        notifications.setSuccessMessage(
          "Authenticated with Google successfully"
        );
        components.setDialogs({
          ...components.dialogs,
          authOpen: false,
        });
      } else {
        notifications.setErrorMessage("Authentication with Google failed");
      }
    }
  }

  static extract(url: string | undefined): {
    token_type: string | null;
    access_token: string | null;
  } {
    if (!url) return { token_type: null, access_token: null };
    const searchParams = new URLSearchParams(url);
    return {
      token_type: searchParams.get("token_type"),
      access_token: searchParams.get("access_token"),
    };
  }

  static async getGmail(token_type: string, access_token: string) {
    return (
      (await BackendUtils.get(
        "auth/google/" + token_type + "/" + access_token
      )) as any
    ).data;
  }
}
