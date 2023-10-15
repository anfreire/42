import { DialogContent, List, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNotifications } from "../../../Notifications";
import {
  ChannelHelper,
  EditChannelStack,
  FriendListItem,
  useConversations,
} from "../..";
import { useComponents } from "../../../../common/Components";
import { User, useUser } from "../../../User";
import { useSocket } from "../../../../common/Socket";
import { useSocial } from "../../../Social";

export default function CreateChannelDialogContent() {
  const [passwordType, setPasswordType] = useState<"text" | "password">("text");
  const [type, setType] = useState<"PUBLIC" | "PRIVATE" | "PROTECTED">(
    "PUBLIC"
  );
  const [channelName, setChannelName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [choosed, setChoosed] = useState<User[]>([]);
  const [avatar, setAvatar] = useState<string>("");
  const notifications = useNotifications();
  const conversations = useConversations();
  const components = useComponents();
  const socket = useSocket();
  const social = useSocial();
  const user = useUser();

  useEffect(() => {
    ChannelHelper.setDefaultAvatar(setAvatar);
  }, []);

  useEffect(() => {
    setPassword("");
  }, [type]);

  return (
    <DialogContent
      sx={{
        backgroundColor: "action.hover",
        marginBottom: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        textAlign: "center",
      }}
    >
      <div style={{ marginTop: "20px" }} />

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

      <List
        sx={{
          marginTop: "20px",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {social.friends.map((friend, index) => {
          return friend.username !== "Bot" ? (
            <div key={friend.username}>
              <FriendListItem
                friend={friend}
                choosed={choosed}
                setChoosed={setChoosed}
              />
              {index !== social.friends.length - 1 && <Divider />}
            </div>
          ) : null;
        })}
      </List>
      <Button
        variant="contained"
        sx={{
          marginTop: "20px",
        }}
        onClick={() =>
          ChannelHelper.createChannel(
            socket.socket,
            notifications,
            conversations,
            components,
            channelName,
            avatar,
            user,
            choosed,
            type,
            password
          )
        }
      >
        Create Group
      </Button>
    </DialogContent>
  );
}
