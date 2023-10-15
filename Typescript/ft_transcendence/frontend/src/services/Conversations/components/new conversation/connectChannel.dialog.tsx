import { Dialog, DialogTitle, Tab, Tabs } from "@mui/material";
import { CreateChannelDialogContent, JoinChannelDialogContent, useConversations } from "../..";
import { useComponents } from "../../../../common/Components";

export default function ConnectChannelDialog() {
  const components = useComponents();
  const conversations = useConversations();

  return (
    <Dialog
      sx={{ textAlign: "center" }}
      open={components.dialogs.connectChannelOpen}
      onClose={() => {
        components.setDialogs({
          ...components.dialogs,
          connectChannelOpen: false,
        });
      }}
    >
      <DialogTitle sx={{ fontSize: "30px" }}>
        <Tabs
          value={conversations.location === "NEW_CHANNEL" ? 0 : 1}
          variant="fullWidth"
        >
          <Tab
            label="Create a channel"
            onClick={() => {
              conversations.setLocation("NEW_CHANNEL");
            }}
          />
          <Tab
            label="Join a channel"
            onClick={() => {
              conversations.setLocation("JOIN_CHANNEL");
            }}
          />
        </Tabs>
      </DialogTitle>
      {conversations.location === "NEW_CHANNEL" ? (
        <CreateChannelDialogContent />
      ) : (
        <JoinChannelDialogContent />
      )}
    </Dialog>
  );
}
