import { List, Typography } from "@mui/material";
import { SocialHelper, useSocial } from "../../Social";
import FriendListItem from "./friend.listitem";
import { useEffect } from "react";
import { useSocket } from "../../../common/Socket";
import { useUser } from "../../User";

export function BlockedUsersBox() {
  const social = useSocial();
  const socket = useSocket();
  const user = useUser();

  useEffect(() => {
    SocialHelper.loadBlockedUsers(
      socket.socket,
      user.studentId as string,
      social
    );
  }, [user.studentId]);

  return (
    <>
      {social.blockedUsers.length > 0 ? (
        <List
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            width: "100%",
            overflowY: "auto",
            padding: "0px",
            marginBottom: "10px",
          }}
        >
          {social.blockedUsers.map((friend, index) => {
            return <FriendListItem friend={friend} key={index} />;
          })}
        </List>
      ) : (
        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          You have no blocked users.
        </Typography>
      )}
    </>
  );
}
