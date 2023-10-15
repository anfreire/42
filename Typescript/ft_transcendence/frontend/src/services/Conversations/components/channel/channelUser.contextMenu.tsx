import { Menu, MenuItem } from "@mui/material";
import { User, useUser } from "../../../User";
import { useSocket } from "../../../../common/Socket";
import { useNotifications } from "../../../Notifications";
import { useComponents } from "../../../../common/Components";
import { contextMenuItemsBuilder, useConversations } from "../..";
import { useGame } from "../../../Game";

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
  role: "ADMIN" | "OWNER" | "USER" | "BANNED" | "MUTED";
  data: User;
  myRole: "ADMIN" | "OWNER" | "USER" | "BANNED" | "MUTED" | undefined;
  setMuteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChannelUserContextMenu(props: MessageContextMenuProps) {
  const socket = useSocket();
  const user = useUser();
  const notifications = useNotifications();
  const components = useComponents();
  const conversations = useConversations();
  const game = useGame();

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
      {contextMenuItemsBuilder(
        handleClose,
        props,
        conversations,
        socket.socket,
        user,
        components,
        notifications,
        game
      ).map((item, index) => {
        if (item.condition)
          return (
            <MenuItem key={index} onClick={item.onClick}>
              {item.icon}
              {item.text}
            </MenuItem>
          );
      })}
    </Menu>
  );
}
