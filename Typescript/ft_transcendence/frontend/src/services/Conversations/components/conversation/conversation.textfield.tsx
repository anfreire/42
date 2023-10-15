import { Divider, Stack, TextField, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useState } from "react";
import { useUser } from "../../../User";
import { useGame } from "../../../Game";
import { useSocket } from "../../../../common/Socket";
import { ConversationsHelper, useConversations } from "../..";
import { useComponents } from "../../../../common/Components";
import { useTheme as useMyTheme } from "../../../../common/Theme";

export default function ConversationTextField() {
  const myTheme = useMyTheme();
  const [sendHover, setSendHover] = useState(false);
  const [gameHover, setGameHover] = useState(false);
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const user = useUser();
  const game = useGame();
  const conversations = useConversations();
  const socket = useSocket();
  const components = useComponents();

  return (
    <Stack
      sx={{
        borderTop: "1px solid",
        borderColor: myTheme.accentColor,
        height: "50px",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
      }}
      direction="row"
    >
      <SportsEsportsIcon
        sx={{
          fontSize: "50px",
          color: gameHover ? myTheme.accentColor : theme.palette.text.disabled,
          "&:hover": {
            cursor: "pointer",
          },
          marginLeft: "5px",
          marginRight: "5px",
        }}
        onMouseEnter={() => {
          setGameHover(true);
        }}
        onMouseLeave={() => {
          setGameHover(false);
        }}
        onClick={() => {
          game.setGameDialogOrigin("CONVERSATION");
          components.setDialogs({
            ...components.dialogs,
            inviteGameOpen: true,
          });
        }}
      />
      <Divider
        sx={{
          height: "100%",
          width: "1px",
          backgroundColor: myTheme.accentColor,
        }}
        orientation="vertical"
        flexItem
      />
      <TextField
        variant="standard"
        size="small"
        sx={{
          width: "100%",
          textAlign: "center",
        }}
        InputProps={{
          style: {
            height: "100%",
            textAlign: "center",
            color: theme.palette.text.primary,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingLeft: 10,
            fontSize: "20px",
          },
          disableUnderline: true,
          endAdornment: null,
        }}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            ConversationsHelper.sendMessage(
              socket.socket,
              user,
              conversations,
              setMessage,
              message
            );
          }
        }}
      />
      <SendIcon
        sx={{
          fontSize: "40px",
          color: sendHover ? myTheme.accentColor : theme.palette.text.disabled,
          "&:hover": {
            cursor: "pointer",
          },
          marginRight: "5px",
        }}
        onMouseEnter={() => {
          setSendHover(true);
        }}
        onMouseLeave={() => {
          setSendHover(false);
        }}
        onClick={() =>
          ConversationsHelper.sendMessage(
            socket.socket,
            user,
            conversations,
            setMessage,
            message
          )
        }
      />
    </Stack>
  );
}
