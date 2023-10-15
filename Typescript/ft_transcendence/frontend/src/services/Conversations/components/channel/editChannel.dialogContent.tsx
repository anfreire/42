import { Button, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { ChannelHelper, ChannelListItem, EditChannelStack, useConversations } from "../..";
import { useNotifications } from "../../../Notifications";
import { useSocket } from "../../../../common/Socket";
import { useUser } from "../../../User";

interface EditChannelDialogContentProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditChannelDialogContent(
  props: EditChannelDialogContentProps
) {
  const [passwordType, setPasswordType] = useState<"text" | "password">("text");
  const [type, setType] = useState<"PUBLIC" | "PRIVATE" | "PROTECTED">(
    "PUBLIC"
  );
  const [channelName, setChannelName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const conversations = useConversations();
  const notifications = useNotifications();
  const socket = useSocket();
  const user = useUser();

  useEffect(() => {
    if (conversations.currConversation.type === "CHANNEL") {
      ChannelHelper.updateChannelUsers(socket.socket, conversations);
      setChannelName(
        (conversations.currConversation.data as ChannelListItem).name
      );
      setAvatar(
        (conversations.currConversation.data as ChannelListItem).avatar
      );
      setType((conversations.currConversation.data as ChannelListItem).type);
    }
    return () => {
      props.setEditMode(false);
    };
  }, [conversations.currConversation]);

  return (
    <DialogContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <EditChannelStack
        avatar={avatar}
        setAvatar={setAvatar}
        channelName={channelName}
        setChannelName={setChannelName}
        type={type}
        setType={setType}
        password={password}
        setPassword={setPassword}
        passwordType={passwordType}
        setPasswordType={setPasswordType}
      />
      <Button
        sx={{
          marginTop: "20px",
          fontSize: "15px",
        }}
        onClick={() => {
          ChannelHelper.updateChannel(
            socket.socket,
            user,
            notifications,
            conversations,
            channelName,
            avatar,
            type,
            props.setEditMode,
            password
          );
        }}
        variant="contained"
      >
        DONE
      </Button>
    </DialogContent>
  );
}
