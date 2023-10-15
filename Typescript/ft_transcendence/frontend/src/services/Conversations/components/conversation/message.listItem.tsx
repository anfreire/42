import {
  Avatar,
  Box,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Message, MessageContextMenu } from "../..";
import { useState } from "react";
import { useComponents } from "../../../../common/Components";
import { SocialHelper, useSocial } from "../../../Social";
import { useSocket } from "../../../../common/Socket";
import { useUser } from "../../../User";
import { GameInviteMessageBox } from "../../../Game";
import { Color } from "../../../../common/Theme";

interface MessageListItemProps {
  data: Message;
}

export default function MessageListItem(props: MessageListItemProps) {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const components = useComponents();
  const social = useSocial();
  const socket = useSocket();
  const theme = useTheme();
  const user = useUser();

  const isMe = props.data.from.studentId === user.studentId;

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
      }}
    >
      {!isMe ? (
        <Stack
          direction="column"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            src={props.data.from.avatar}
            onClick={() => {
              SocialHelper.handleFriendAvatarClick(
                socket.socket,
                user,
                props.data.from,
                social,
                components
              );
            }}
          />
          <Typography
            sx={{
              fontSize: "12px",
              color: theme.palette.text.secondary,
              maxWidth: 60,
              overflow: "hidden",
            }}
          >
            {props.data.from.username}
          </Typography>
        </Stack>
      ) : null}
      {props.data.isGame ? (
        <GameInviteMessageBox
          isMe={isMe}
          data={props.data}
          onContextMenu={handleContextMenu}
        />
      ) : (
        <Box
          onContextMenu={handleContextMenu}
          sx={{
            borderRadius: 10,
            backgroundColor: isMe
              ? theme.palette[user.color as Color].dark
              : theme.palette.action.selected,
            padding: "10px 15px",
            maxWidth: "70%",
            wordWrap: "break-word",
            "&:hover": {
              cursor: isMe ? "pointer" : "default",
            },
            marginLeft: isMe ? 0 : 1,
            marginTop: isMe ? 0 : -2,
          }}
        >
          {props.data.content}
        </Box>
      )}
      {isMe ? (
        <>
          <MessageContextMenu
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
            handleClose={handleClose}
            type={isMe ? "MINE" : "OTHER"}
            data={props.data}
          />
          <Avatar
            sx={{
              width: 40,
              height: 40,
              marginLeft: 1,
            }}
            src={props.data.from.avatar}
          />
        </>
      ) : null}
    </ListItem>
  );
}
