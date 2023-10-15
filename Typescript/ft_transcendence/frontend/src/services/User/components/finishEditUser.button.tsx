import { Button } from "@mui/material";
import { UserHelper } from "../utils/user.helper";
import { useUser } from "..";
import { useSocket } from "../../../common/Socket";
import { useNotifications } from "../../Notifications";
import { useSocial } from "../../Social";
import { useConversations } from "../../Conversations";
import { Color } from "../../../common/Theme";
import { useComponents } from "../../../common/Components";
import { useGame } from "../../Game";

export default function FinishEditUserButton(props: {
  input: string;
  color: Color;
}): JSX.Element {
  const components = useComponents();
  const user = useUser();
  const socket = useSocket();
  const notifications = useNotifications();
  const social = useSocial();
  const conversations = useConversations();
  const game = useGame();

  return (
    <Button
      color={user.color}
      sx={{
        marginTop: "10px",
      }}
      onClick={() => {
        if (components.dialogs.registerOpen)
          UserHelper.registerUser(
            props.input,
            props.color,
            user,
            notifications,
            components,
            socket.socket,
            social,
            conversations,
            game
          );
        else if (components.dialogs.editOpen)
          UserHelper.editUser(
            props.input,
            props.color,
            user,
            notifications,
            components,
            socket.socket
          );
      }}
    >
      Done
    </Button>
  );
}
