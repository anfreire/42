import {
  ChatWithFriendDialog,
  ConnectChannelDialog,
  ConversationBox,
  ConversationsAppBar,
  ConversationsList,
  NewConversationBox,
  useConversations,
} from "../..";
import { useGame } from "../../../Game";
import { Box, useTheme } from "@mui/material";
import { useTheme as useMyTheme } from "../../../../common/Theme";

export default function ConversationsBox() {
  const conversations = useConversations();
  const theme = useTheme();
  const game = useGame();
  const myTheme = useMyTheme();

  return (
    <>
      <Box
        sx={{
          borderRadius: 3,
          height: "100%",
          width: "100%",
          border: "1px solid",
          borderColor: myTheme.accentColor,
          backgroundColor: theme.palette.background.default,
          overflow: "hidden",
          opacity: game.location === "GAME" ? 0.5 : 1,
          pointerEvents: game.location === "GAME" ? "none" : "auto",
        }}
      >
        <ConversationsAppBar />
        {conversations.location == "CONVERSATIONS" ||
        conversations.location === "NEW_CHANNEL" ||
        conversations.location === "NEW_CHAT" ||
        conversations.location === "JOIN_CHANNEL" ? (
          <Box
            sx={{
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              padding: 0,
            }}
          >
            <ConversationsList />
          </Box>
        ) : conversations.location == "CHAT" ||
          conversations.location == "CHANNEL" ? (
          <ConversationBox />
        ) : (
          <NewConversationBox />
        )}
      </Box>
      <ChatWithFriendDialog />
      <ConnectChannelDialog />
    </>
  );
}
