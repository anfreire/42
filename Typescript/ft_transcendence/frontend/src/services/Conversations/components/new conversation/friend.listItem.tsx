import { Avatar, Grid, ListItem, Stack, Typography } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { User, useUser } from "../../../User";
import { useState } from "react";
import { ChannelHelper, ConversationsHelper, useConversations } from "../..";
import { useSocket } from "../../../../common/Socket";
import { useComponents } from "../../../../common/Components";
import { StatusCircleIcon } from "../../../Social";

export interface FriendListItemProps {
  friend: User;
  choosed: User[] | null;
  setChoosed?: React.Dispatch<React.SetStateAction<User[]>> | null;
  checkbox?: boolean;
}

export default function FriendListItem(props: FriendListItemProps) {
  const [hoover, setHoover] = useState(false);
  const conversations = useConversations();
  const user = useUser();
  const socket = useSocket();
  const components = useComponents();

  return (
    <ListItem
      onClick={() =>
        ConversationsHelper.handleFriendClicked(
          socket.socket,
          conversations,
          user,
          components,
          props
        )
      }
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: hoover ? "action.hover" : "transparent",
        },
      }}
      onMouseEnter={() => {
        setHoover(true);
      }}
      onMouseLeave={() => {
        setHoover(false);
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        columns={10}
        sx={{ width: "100%" }}
      >
        <Grid item xs={9}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              marginLeft:
                conversations.location === "NEW_CHANNEL" ? "-12px" : "0px",
            }}
          >
            {conversations.location === "NEW_CHANNEL" || props.checkbox ? (
              <CheckBox
                sx={{
                  color: ChannelHelper.isFriendChoosed(props)
                    ? "primary.main"
                    : "action.hover",
                  fontSize: "30px",
                }}
                onClick={() => ChannelHelper.setFriendChoosed(props)}
              />
            ) : null}
            <Avatar src={props.friend.avatar} />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {props.friend.username}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={1}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <StatusCircleIcon state={props.friend.status} />
          </Stack>
        </Grid>
      </Grid>
    </ListItem>
  );
}
