import { List, Typography } from "@mui/material";
import { useSocial } from "../../Social";
import FriendListItem from "./friend.listitem";

export default function FriendsList() {
  const social = useSocial();

  return (
    <>
      {social.friends.length === 0 ? (
        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          You have no friends.
        </Typography>
      ) : (
        <List
          sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {social.friends.map((friend, index) => {
            return <FriendListItem friend={friend} key={index} />;
          })}
        </List>
      )}
    </>
  );
}
