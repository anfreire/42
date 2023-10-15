import DeleteIcon from "@mui/icons-material/Delete";
import { Menu, MenuItem } from "@mui/material";
import { ConversationsHelper, Message, useConversations } from "../..";
import { useNotifications } from "../../../Notifications";
import { useSocket } from "../../../../common/Socket";
import { useUser } from "../../../User";

interface MessageContextMenuProps {
  contextMenu: {
    mouseX: number;
    mouseY: number;
  } | null;
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      mouseX: number;
      mouseY: number;
    } | null>
  >;
  handleClose: any;
  type: "MINE" | "OTHER";
  data: Message;
}

export default function MessageContextMenu(props: MessageContextMenuProps) {
  const conversations = useConversations();
  const notifications = useNotifications();
  const socket = useSocket();
  const user = useUser();

  const handleClose = () => {
    props.setContextMenu(null);
  };

  return (
    <Menu
      open={props.contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        props.contextMenu !== null
          ? { top: props.contextMenu.mouseY, left: props.contextMenu.mouseX }
          : undefined
      }
    >
      {props.type === "MINE" ? (
        <MenuItem
          onClick={() => {
            ConversationsHelper.deleteMessage(
              socket.socket,
              user,
              conversations,
              notifications,
              props.data
            );
          }}
        >
          <DeleteIcon
            sx={{
              marginRight: 1,
            }}
          />
          Delete
        </MenuItem>
      ) : null}
    </Menu>
  );
}
