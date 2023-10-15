import { Divider, List } from "@mui/material";
import { ConversationListItem } from "./conversation.listitem";
import { useConversations } from "../..";

export default function ConversationsList() {
  const conversations = useConversations();

  return (
    <List
      sx={{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: "calc(100% - 50px)",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        padding: 0,
      }}
    >
      {conversations.conversations.map((conversation) => (
        <div key={Math.random()}>
          <ConversationListItem
            type={conversation.type}
            data={conversation.data}
            op="JOIN"
          />
          <Divider />
        </div>
      ))}
    </List>
  );
}
