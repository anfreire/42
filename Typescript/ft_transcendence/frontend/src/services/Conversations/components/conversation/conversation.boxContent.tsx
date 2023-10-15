import { useEffect, useRef } from "react";
import {
  ChannelDialogProfile,
  ConversationTextField,
  ConversationsHelper,
  MessageListItem,
  useConversations,
} from "../..";
import { useSocket } from "../../../../common/Socket";
import { useUser } from "../../../User";
import { Box, List } from "@mui/material";

export default function ConversationBoxContent() {
  const conversations = useConversations();
  const user = useUser();
  const socket = useSocket();
  const listRef = useRef<any>(null);

  useEffect(() => {
    ConversationsHelper.loadMessages(socket.socket, user, conversations);
  }, [conversations.location, conversations.currConversation]);

  useEffect(() => {
    if (listRef.current === null) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [conversations.messages]);

  return (
    <>
      <ChannelDialogProfile />
      <Box
        sx={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          height: "calc(100% - 100px)",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          padding: 0,
        }}
        ref={listRef}
      >
        <List
          sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {conversations.messages.map((message, index) => (
            <MessageListItem key={index} data={message} />
          ))}
        </List>
      </Box>
      <ConversationTextField />
    </>
  );
}
