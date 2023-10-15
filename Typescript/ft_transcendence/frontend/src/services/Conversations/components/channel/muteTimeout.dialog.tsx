import {
  Box,
  Button,
  Dialog,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { User, useUser } from "../../../User";
import { useState } from "react";
import { useNotifications } from "../../../Notifications";
import { useSocket } from "../../../../common/Socket";
import { ChannelHelper, ChannelListItem, useConversations } from "../..";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

export default function MuteTiemoutDialog(props: Props) {
  const [value, setValue] = useState<number>(1);
  const user = useUser();
  const notifications = useNotifications();
  const socket = useSocket();
  const conversations = useConversations();

  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          How long?
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Mute timeout"
          onChange={(event) => {
            setValue(event.target.value as number);
          }}
        >
          <MenuItem value={1}>1 minute</MenuItem>
          <MenuItem value={5}>5 minutes</MenuItem>
          <MenuItem value={10}>10 minutes</MenuItem>
          <MenuItem value={15}>15 minutes</MenuItem>
        </Select>
        <Button
          onClick={() => {
            ChannelHelper.adminOperation(
              "MUTE",
              socket.socket,
              user,
              (conversations.currConversation.data as ChannelListItem).name,
              props.user,
              notifications,
              value
            );
            props.setOpen(false);
          }}
          sx={{
            marginTop: 2,
            fontSize: "15px",
          }}
        >
          OK
        </Button>
      </Box>
    </Dialog>
  );
}
