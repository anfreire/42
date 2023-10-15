import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BlockIcon from "@mui/icons-material/Block";
import ChatIcon from "@mui/icons-material/Chat";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import { useComponents } from "../../../common/Components";
import { useUser } from "../../User";
import { useGame } from "../../Game";
import { SocialHelper, useSocial } from "../../Social";
import { useNotifications } from "../../Notifications";
import { ChatHelper, useConversations } from "../../Conversations";
import { useSocket } from "../../../common/Socket";
import { RefreshEvents, RefreshUtils } from "../../../common/Refresh";
import { AchievementTab, GamesTab } from "..";
import ReplayIcon from "@mui/icons-material/Replay";

export default function FriendProfileDialog() {
  const [tab, setTab] = useState(0);
  const components = useComponents();
  const user = useUser();
  const game = useGame();
  const social = useSocial();
  const notifications = useNotifications();
  const conversations = useConversations();
  const socket = useSocket();

  return (
    <Dialog
      sx={{
        textAlign: "center",
      }}
      open={components.dialogs.profileOpen}
      onClose={() => {
        components.setDialogs({
          ...components.dialogs,
          profileOpen: false,
        });
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "45px",
            fontWeight: "bold",
            maxwidth: "300px",
          }}
        >
          {social.friendProfile?.username}
        </DialogTitle>
        <DialogContent
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={social.friendProfile?.avatar}
            sx={{
              width: "100px",
              height: "100px",
              marginBottom: "10px",
            }}
          />
          <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              color="primary"
              title="Invite to play"
              onClick={() => {
                game.setGameDialogOrigin("PROFILE");
                components.setDialogs({
                  ...components.dialogs,
                  inviteGameOpen: true,
                });
              }}
            >
              <SportsEsportsIcon />
            </Button>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              color="secondary"
              title="Send message"
              onClick={() =>
                ChatHelper.clickFriend(
                  conversations,
                  user,
                  socket.socket,
                  components,
                  social.friendProfile as any
                )
              }
            >
              <ChatIcon />
            </Button>
            {!social.friendProfile?.isFriend ? (
              <Button
                variant="contained"
                onClick={() => {
                  SocialHelper.sendFriendRequest(
                    socket.socket,
                    user,
                    social,
                    notifications
                  );
                }}
                color="success"
                title="Send friend request"
              >
                <PersonAddIcon />
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  if (user.studentId && social.friendProfile)
                    SocialHelper.removeFriendHandler(
                      socket.socket,
                      user.studentId as string,
                      social.friendProfile.studentId,
                      notifications
                    );
                }}
                color="error"
                title="Remove friend"
              >
                <PersonRemoveIcon />
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() => {
                SocialHelper.blockFriendHandler(
                  socket.socket,
                  notifications,
                  user,
                  social
                );
              }}
              color="warning"
              title={social.friendProfile?.isBlocked ? "Unblock" : "Block"}
            >
              {social.friendProfile?.isBlocked ? <ReplayIcon /> : <BlockIcon />}
            </Button>
          </Stack>
          <Tabs
            value={tab}
            onChange={() => {
              setTab(tab === 0 ? 1 : 0);
            }}
            sx={{
              marginTop: "20px",
            }}
          >
            <Tab label="Achievements" />
            <Tab label="Matches" />
          </Tabs>
          <Box
            sx={{
              width: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {tab === 0 ? <AchievementTab type="FRIEND" /> : <GamesTab />}
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
