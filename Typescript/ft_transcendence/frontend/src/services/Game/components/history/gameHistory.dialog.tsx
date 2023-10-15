import { useEffect } from "react";
import { useComponents } from "../../../../common/Components";
import { useSocket } from "../../../../common/Socket";
import { useSocial } from "../../../Social";
import { UserUtils, useUser } from "../../../User";
import { Box, Dialog, DialogContent } from "@mui/material";
import { GamesTab } from "../../../Profile";

export default function GameHistoryDialog() {
  const user = useUser();
  const socket = useSocket();
  const social = useSocial();
  const components = useComponents();

  useEffect(() => {
    if (components.dialogs.gameHistoryOpen) {
      (async () => {
        if (!user.studentId) return;
        const me = (await UserUtils.getUser(
          user.studentId,
          user.studentId,
          socket.socket
        )) as any;
        social.setFriendProfile(me.data);
      })();
    }
  }, [components.dialogs.gameHistoryOpen]);

  return (
    <Dialog
      sx={{
        textAlign: "center",
      }}
      open={components.dialogs.gameHistoryOpen}
      onClose={() => {
        components.setDialogs({
          ...components.dialogs,
          gameHistoryOpen: false,
        });
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DialogContent>
          <GamesTab />
        </DialogContent>
      </Box>
    </Dialog>
  );
}
