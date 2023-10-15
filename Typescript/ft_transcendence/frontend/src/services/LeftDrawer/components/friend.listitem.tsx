import { Avatar, Grid, ListItem, Typography } from "@mui/material";
import { useComponents } from "../../../common/Components";
import { useSocket } from "../../../common/Socket";
import { SocialHelper, StatusCircleIcon, useSocial } from "../../Social";
import { User, useUser } from "../../User";

export default function FriendListItem(props: { friend: User }) {
  const social = useSocial();
  const user = useUser();
  const socket = useSocket();
  const components = useComponents();

  return (
    <ListItem
      onClick={() => {
        SocialHelper.handleFriendAvatarClick(
          socket.socket,
          user,
          props.friend,
          social,
          components
        );
      }}
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "action.hover",
        },
        borderRadius: "10px",
      }}
      title="View profile"
    >
      <Grid
        container
        spacing={2}
        columns={10}
        sx={{
          width: "280px",
        }}
        alignItems="center"
        alignContent="center"
      >
        <Grid item xs={2}>
          <Avatar src={props.friend.avatar} sx={{ marginRight: "10px" }} />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            overflow: "hidden",
          }}
        >
          <Typography variant="h5">{props.friend.username}</Typography>
        </Grid>
        <Grid item xs={2}>
          <StatusCircleIcon state={props.friend.status} />
        </Grid>
      </Grid>
    </ListItem>
  );
}
