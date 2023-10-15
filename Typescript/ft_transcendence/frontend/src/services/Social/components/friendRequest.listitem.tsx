import {
  Avatar,
  Button,
  Grid,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useNotifications } from "../../Notifications";
import { User, useUser } from "../../User";
import { useSocket } from "../../../common/Socket";
import { SocialHelper } from "..";

export default function FriendRequestListItem(props: { friend: User }) {
  const notifications = useNotifications();
  const socket = useSocket();
  const user = useUser();

  return (
    <ListItem>
      <Grid
        container
        spacing={2}
        alignItems="center"
        columns={12}
        sx={{
          width: "400px",
        }}
      >
        <Grid item xs={6}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              marginLeft: "-12px",
            }}
          >
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
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              SocialHelper.acceptFriendRequest(
                socket.socket,
                user,
                notifications,
                props.friend
              );
            }}
          >
            Accept
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              SocialHelper.declineFriendRequest(
                socket.socket,
                user,
                notifications,
                props.friend
              );
            }}
          >
            Decline
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}
