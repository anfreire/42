import { DialogContent, Divider, List } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ChannelListItem,
  ChannelUtils,
  ConversationListItem,
  useConversations,
} from "../..";
import { useSocket } from "../../../../common/Socket";
import { useUser } from "../../../User";

export default function JoinChannelDialogContent() {
  const [availableChannels, setAvailableChannels] = useState<ChannelListItem[]>(
    []
  );
  const conversations = useConversations();
  const socket = useSocket();
  const user = useUser();

  useEffect(() => {
    (async () => {
      if (conversations.location === "JOIN_CHANNEL" && user.studentId) {
        const localAvailableChannels = (await ChannelUtils.getAvailableChannels(
          socket.socket,
          user.studentId
        )) as any;
        if (localAvailableChannels.data)
          setAvailableChannels(localAvailableChannels.data);
      }
    })();
  }, []);

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
      <List
        sx={{
          marginTop: "20px",
          width: "400px",
          overflow: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {availableChannels.map((channel: ChannelListItem, index: number) => {
          return (
            <div key={index}>
              <ConversationListItem
                type="CHANNEL"
                data={channel}
                op="NEW"
                protected={channel.type === "PROTECTED"}
              />
              {index !== availableChannels.length - 1 && <Divider />}
            </div>
          );
        })}
      </List>
    </DialogContent>
  );
}
