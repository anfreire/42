import {
  Box,
  Button,
  Dialog,
  Divider,
  List,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useEffect, useState } from "react";
import { User, useUser } from "../../../User";
import {
  ChannelHelper,
  ChannelListItem,
  ChannelProfileListItem,
  EditChannelDialogContent,
  FriendListItem,
  ViewChannelDialogContent,
  useConversations,
} from "../..";
import { useNotifications } from "../../../Notifications";
import { useComponents } from "../../../../common/Components";
import { useSocket } from "../../../../common/Socket";

export default function ChannelDialogProfile() {
  const [inviteFriends, setInviteFriends] = useState<boolean>(false);
  const [friendsNotIn, setFriendsNotIn] = useState<User[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [choosed, setChoosed] = useState<User[]>([]);
  const conversations = useConversations();
  const notifications = useNotifications();
  const components = useComponents();
  const socket = useSocket();
  const user = useUser();

  const myRole = conversations.channelUsers.find(
    (channelUser) => channelUser.data.studentId === user.studentId
  )?.role;

  useEffect(() => {
    if (!components.dialogs.channelProfileOpen) return;
    ChannelHelper.updateChannelUsers(socket.socket, conversations);
    ChannelHelper.updateFriendsNotInChannel(
      socket.socket,
      user,
      conversations,
      setFriendsNotIn
    );
  }, [components.dialogs.channelProfileOpen]);

  return (
    <Dialog
      open={components.dialogs.channelProfileOpen}
      onClose={() => {
        components.setDialogs({
          ...components.dialogs,
          channelProfileOpen: false,
        });
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {conversations.currConversation.type === "CHANNEL" ? (
          <>
            {conversations.channelUsers.find(
              (channelUser) =>
                channelUser.role === "OWNER" &&
                channelUser.data.studentId === user.studentId
            ) && !inviteFriends ? (
              <Button
                sx={{
                  position: "absolute",
                  height: "0px",
                  width: "0px",
                  top: "80px",
                  opacity: 0,
                  transition: "opacity 0.2s ease-in-out",
                  zIndex: editMode ? -1 : 2,
                  "&:hover": {
                    opacity: editMode ? 0 : 0.9,
                  },
                }}
                onClick={() => {
                  setEditMode(true);
                }}
                color={user.color}
              >
                <EditIcon
                  sx={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </Button>
            ) : null}
            {editMode ? (
              <EditChannelDialogContent setEditMode={setEditMode} />
            ) : (
              <ViewChannelDialogContent
                inviteFriends={inviteFriends}
                setInviteFriends={setInviteFriends}
              />
            )}
            {!inviteFriends ? (
              <Divider
                variant="middle"
                sx={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}
              />
            ) : null}
            <List
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                width: "400px",
                height: "100%",
                overflowY: "auto",
                padding: "0px",
              }}
            >
              {!inviteFriends ? (
                conversations.channelUsers
                  .filter((user) => user.role !== "BANNED")
                  .map((user) => (
                    <ChannelProfileListItem
                      key={user.data.studentId}
                      user={user.data}
                      role={user.role}
                      myRole={myRole}
                    />
                  ))
              ) : friendsNotIn.length > 0 ? (
                friendsNotIn.map((friend, index) => {
                  return (
                    <div key={index}>
                      <FriendListItem
                        friend={friend}
                        choosed={choosed}
                        setChoosed={setChoosed}
                        checkbox={true}
                      />
                      {index !== friendsNotIn.length - 1 && <Divider />}
                    </div>
                  );
                })
              ) : (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: "center",
                    marginTop: "40px",
                    marginBottom: "30px",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    All your friends are in this channel!
                  </Typography>
                  <CelebrationIcon />
                </Stack>
              )}
            </List>
            {conversations.channelUsers.find(
              (channelUser) => channelUser.role === "BANNED"
            ) ? (
              <Box
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "action.hover",
                  marginTop: "10px",
                  marginBottom: "15px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  Banned users
                </Typography>

                <List
                  sx={{
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    width: "400px",
                    height: "100%",
                    overflowY: "auto",
                    padding: "0px",
                    marginBottom: "10px",
                  }}
                >
                  {conversations.channelUsers
                    .filter((user) => user.role === "BANNED")
                    .map((user) => (
                      <ChannelProfileListItem
                        key={user.data.studentId}
                        user={user.data}
                        role={user.role}
                        myRole={myRole}
                      />
                    ))}
                </List>
              </Box>
            ) : null}
            {inviteFriends && friendsNotIn.length > 0 ? (
              <Button
                sx={{ marginTop: "10px" }}
                variant="contained"
                onClick={() => {
                  ChannelHelper.addFriends(
                    socket.socket,
                    user,
                    choosed,
                    (conversations.currConversation.data as ChannelListItem)
                      .name,
                    notifications,
                    components
                  );
                  setInviteFriends(false);
                }}
              >
                Add friends
              </Button>
            ) : null}
          </>
        ) : null}
      </Box>
    </Dialog>
  );
}
