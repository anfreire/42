import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUser } from "../../../User";
import { useSocket } from "../../../../common/Socket";
import {
  ChannelListItem,
  ChatListItem,
  ConversationsHelper,
  useConversations,
} from "../..";
import { useComponents } from "../../../../common/Components";
import { SocialHelper, useSocial } from "../../../Social";
import { useTheme as useMyTheme } from "../../../../common/Theme";

export default function ConversationsAppBar() {
  const user = useUser();
  const socket = useSocket();
  const conversations = useConversations();
  const components = useComponents();
  const social = useSocial();
  const theme = useMyTheme();

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          height: "50px",
          justifyContent: "center",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: theme.accentColor,
          overflow: "hidden",
        }}
        color="transparent"
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <IconButton
            onClick={() =>
              ConversationsHelper.handleBarBackButton(conversations)
            }
            sx={{
              visibility:
                conversations.location === "CHANNEL" ||
                conversations.location === "CHAT" ||
                conversations.location === "NEW_CONVERSATION"
                  ? "visible"
                  : "hidden",
              marginLeft: "-20px",
            }}
            title="Back"
          >
            <ArrowBackIcon
              sx={{
                color: theme.accentColor,
                fontSize: "35px",
              }}
            />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            onClick={
              conversations.location == "CHAT"
                ? () => {
                    SocialHelper.handleFriendAvatarClick(
                      socket.socket,
                      user,
                      conversations.currConversation.data as ChatListItem,
                      social,
                      components
                    );
                  }
                : conversations.location == "CHANNEL"
                ? () =>
                    components.setDialogs({
                      ...components.dialogs,
                      channelProfileOpen: true,
                    })
                : undefined
            }
            sx={{
              "&:hover": {
                cursor:
                  conversations.location === "CHAT" ||
                  conversations.location === "CHANNEL"
                    ? "pointer"
                    : "default",
              },
            }}
          >
            {conversations.location == "CHAT" ||
            conversations.location == "CHANNEL" ? (
              <Avatar src={conversations.currConversation.data?.avatar} />
            ) : null}
            <Typography
              sx={{
                color: theme.accentColor,
                fontWeight: "bold",
              }}
              variant="h4"
            >
              {ConversationsHelper.getBarTitle(
                conversations.location,
                conversations.currConversation.type === "CHANNEL"
                  ? (conversations.currConversation.data as ChannelListItem)
                      .name
                  : conversations.currConversation.type === "CHAT"
                  ? (conversations.currConversation.data as ChatListItem)
                      .username
                  : undefined
              )}
            </Typography>
          </Stack>
          <IconButton
            title="Start a new conversation"
            onClick={() => {
              conversations.setLocation("NEW_CONVERSATION");
            }}
            sx={{
              visibility:
                conversations.location === "CONVERSATIONS" ||
                conversations.location === "NEW_CHAT" ||
                conversations.location === "NEW_CHANNEL" ||
                conversations.location === "JOIN_CHANNEL"
                  ? "visible"
                  : "hidden",
              marginRight: "-20px",
            }}
          >
            <AddIcon
              sx={{
                color: theme.accentColor,
                fontSize: "35px",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
