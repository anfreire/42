import {
  ThemeProvider,
  CssBaseline,
  Grid,
} from "@mui/material";
import { EditUserDialog, UserHelper, useUser } from "./services/User";
import { useSocket } from "./common/Socket";
import { useSocial } from "./services/Social";
import { Notification, useNotifications } from "./services/Notifications";
import { useConversations } from "./services/Conversations";
import {
  GameBox,
  GameHelper,
  GameHistoryDialog,
  GameInviteDialog,
  GameListItem,
  useGame,
} from "./services/Game";
import { useEffect } from "react";
import { RefreshUtils } from "./common/Refresh";
import { Auth42Dialog, Auth42Utils, AuthGoogleUtils } from "./services/Auth";
import { useTheme } from "./common/Theme";
import { FriendProfileDialog } from "./services/Profile";
import ConversationsBox from "./services/Conversations/components/common/conversations.box";
import { TopBar } from "./services/TopBar";
import { ThemeUtils } from "./common/Theme/utils/theme.utils";
import { useComponents } from "./common/Components";
import AchievementsDialog from "./services/User/components/achievements.dialog";

function App() {
  const components = useComponents();
  const user = useUser();
  const socket = useSocket();
  const social = useSocial();
  const notifications = useNotifications();
  const conversations = useConversations();
  const game = useGame();
  const theme = useTheme();

  useEffect(() => {
    RefreshUtils.updateRefresh(
      socket.socket,
      user,
      notifications,
      conversations,
      social,
      game
    );
  }, [
    user.studentId,
    conversations.location,
    conversations.currConversation,
    social.friendProfile,
  ]);

  useEffect(() => {
    if (user.color) {
      theme.setAccentColor(ThemeUtils.getColor(theme.currTheme, user.color));
    }
  }, [theme.currTheme, user.color]);

  useEffect(() => {
    Auth42Utils.removeLocalStorage();
    AuthGoogleUtils.removeLocalStorage();
    AuthGoogleUtils.handleURL(window.location.href);
    Auth42Utils.handleURL(window.location.href);
    UserHelper.init(socket.socket);
    // const cookies = document.cookie.split("; ");
    // console.log(cookies);
    // for (const cookie of cookies) {
    //   const [name, value] = cookie.split("=");
    //   if (name === "studentId") {
    //     user.setStudentId(value);
    //     break;
    //   }
    // }
    return () => {
      UserHelper.onClose(socket.socket);
      if (game.currGame?.id) {
        GameHelper.disconnect(
          socket.socket,
          (game.currGame as GameListItem).id,
          user,
          game
        );
      }
      // if (user.studentId) {
      //   document.cookie = `studentId=${user.studentId}`;
      //   // save cookie for 1 day
      //   const date = new Date();
      //   date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
      //   document.cookie = `expires=${date.toUTCString()}`;
      //   console.log(document.cookie);
      // }
    };
  }, []);

  return (
    <ThemeProvider
      theme={theme.currTheme === "dark" ? theme.dark : theme.light}
    >
      <CssBaseline />
      <GameHistoryDialog />
      <GameInviteDialog />
      <FriendProfileDialog />
      <AchievementsDialog />
      <Notification type="ERROR" />
      <Notification type="INFO" />
      <Notification type="WARNING" />
      <Notification type="SUCCESS" />
      {components.dialogs.authOpen ? <Auth42Dialog /> : null}
      {components.dialogs.editOpen || components.dialogs.registerOpen ? (
        <EditUserDialog />
      ) : null}
      <TopBar />
      <Grid
        minHeight={100}
        container
        spacing={2}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "97vh",
          marginTop: "10px",
        }}
      >
        <Grid
          item
          sx={{
            height: "50%",
            width: "90%",
            marginTop: "30px",
          }}
        >
          <GameBox />
        </Grid>
        <Grid
          item
          sx={{
            height: "47%",
            width: "90%",
          }}
        >
          <ConversationsBox />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
