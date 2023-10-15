import { useEffect, useState } from "react";
import { useConversations } from "../../Conversations";
import { useNotifications } from "../../Notifications";
import { useComponents } from "../../../common/Components";
import { useSocket } from "../../../common/Socket";
import { useSocial } from "../../Social";
import { UserUtils, useUser } from "../../User";
import {
  Auth42Button,
  Auth42Utils,
  AuthGoogleCollapse,
  AuthPhoneCollapse,
} from "..";
import {
  ClickAwayListener,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useGame } from "../../Game";

export default function Auth42Dialog() {
  const [code, setCode] = useState<string | undefined>(undefined);
  const conversations = useConversations();
  const notifications = useNotifications();
  const components = useComponents();
  const socket = useSocket();
  const social = useSocial();
  const user = useUser();
  const game = useGame();

  useEffect(() => {
    (async () => {
      if (code) {
        const studentId = await Auth42Utils.getStudentId(code);
        if (studentId) user.setStudentId(studentId);
      }
    })();
  }, [code]);

  useEffect(() => {
    Auth42Utils.handleAuthSuccess(
      socket.socket,
      user,
      components,
      notifications
    );
  }, [user.studentId]);

  useEffect(() => {
    Auth42Utils.handleDataRecieved(socket.socket, user, components);
    UserUtils.onLogin(socket.socket, user, social, conversations, game);
  }, [user.avatar]);

  return (
    <ClickAwayListener onClickAway={() => {}}>
      <Dialog
        sx={{ textAlign: "center" }}
        open={components.dialogs.authOpen}
        onClose={() => {
          components.setDialogs({ ...components.dialogs, authOpen: false });
        }}
        disableEscapeKeyDown={true}
      >
        {components.collapse.authGoogleOpen ||
        components.collapse.authPhoneOpen ? null : (
          <DialogTitle>Who are you?</DialogTitle>
        )}
        <DialogContent>
          <Auth42Button setCode={setCode} />
          {components.collapse.authGoogleOpen ||
          components.collapse.authPhoneOpen ? null : (
            <DialogContentText style={{ marginTop: "1rem" }}>
              Only 42 students can enter
            </DialogContentText>
          )}
          <AuthGoogleCollapse />
          <AuthPhoneCollapse />
        </DialogContent>
      </Dialog>
    </ClickAwayListener>
  );
}
