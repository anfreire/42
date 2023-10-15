import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {
  ConversationsHelper,
  Message,
  useConversations,
} from "../../../Conversations";
import { useUser } from "../../../User";
import { useSocket } from "../../../../common/Socket";
import { GameSelection, useGame } from "../..";
import { Color } from "../../../../common/Theme";
import { useNotifications } from "../../../Notifications";

interface GameMessageBoxProps {
  isMe: boolean;
  data: Message;
  onContextMenu?: (event: React.MouseEvent) => void;
}

export default function GameInviteMessageBox(props: GameMessageBoxProps) {
  const notifications = useNotifications();
  const theme = useTheme();
  const user = useUser();
  const conversations = useConversations();
  const socket = useSocket();
  const game = useGame();
  const selection: GameSelection = JSON.parse(props.data.content);

  return (
    <Box
      sx={{
        borderRadius: 6,
        backgroundColor: props.isMe
          ? theme.palette[user.color as Color].dark
          : theme.palette.action.selected,
        padding: "10px 15px",
        marginLeft: props.isMe ? 0 : 1,
        marginTop: props.isMe ? 0 : -2,
      }}
      onContextMenu={props.onContextMenu}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{
          // center everything
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Want to play a {selection.mode === "CLASSIC" ? "classic " : "custom "}
          pong?
        </Typography>
        {props.data.from.studentId !== user.studentId && (
          <Button
            variant="text"
            sx={{
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "0px 0px",
              width: "50px",
            }}
            onClick={() => {
              ConversationsHelper.acceptGameInvite(
                socket.socket,
                user,
                conversations,
                props.data,
                game,
                notifications
              );
            }}
          >
            <SportsEsportsIcon />
          </Button>
        )}
      </Stack>
    </Box>
  );
}
