import { Avatar, Button, DialogContent, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChannelHelper, ChannelListItem, useConversations } from "../..";
import { useNotifications } from "../../../Notifications";
import { useComponents } from "../../../../common/Components";
import { useSocket } from "../../../../common/Socket";
import { useUser } from "../../../User";

interface ViewChannelDialogContentProps {
  inviteFriends: boolean;
  setInviteFriends: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewChannelDialogContent(
  props: ViewChannelDialogContentProps
) {
  const conversations = useConversations();
  const notifications = useNotifications();
  const components = useComponents();
  const socket = useSocket();
  const user = useUser();

  return (
    <DialogContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!props.inviteFriends ? (
        <>
          <Button
            sx={{ position: "absolute", right: "10px", top: "10px" }}
            color={user.color}
            variant="outlined"
            onClick={() => {
              props.setInviteFriends(true);
            }}
          >
            <PersonAddIcon sx={{ width: "30px", height: "30px" }} />
          </Button>
          <Button
            sx={{ position: "absolute", left: "10px", top: "10px" }}
            color={user.color}
            variant="outlined"
            onClick={() =>
              ChannelHelper.leaveChannel(
                socket.socket,
                user,
                conversations,
                notifications,
                components
              )
            }
          >
            <LogoutIcon sx={{ width: "30px", height: "30px" }} />
          </Button>
          <Avatar
            src={
              (conversations.currConversation.data as ChannelListItem).avatar
            }
            sx={{ width: "100px", height: "100px", marginBottom: "10px" }}
          />
          <Typography variant="h4">
            {(conversations.currConversation.data as ChannelListItem).name}
          </Typography>
        </>
      ) : (
        <Button
          sx={{
            position: "absolute",
            left: "10px",
            top: "10px",
            marginBottom: "10px",
          }}
          variant="outlined"
          onClick={() => {
            props.setInviteFriends(false);
          }}
        >
          <ArrowBackIcon sx={{ width: "30px", height: "30px" }} />
        </Button>
      )}
    </DialogContent>
  );
}
