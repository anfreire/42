import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupIcon from "@mui/icons-material/Group";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import {
  ChannelHelper,
  ChannelListItem,
  ChatListItem,
  useConversations,
} from "../..";
import { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Collapse,
  Grid,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useNotifications } from "../../../Notifications";
import { useComponents } from "../../../../common/Components";
import { useSocket } from "../../../../common/Socket";
import { useUser } from "../../../User";
import { StatusCircleIcon } from "../../../Social";
import { useTheme as useMyTheme } from "../../../../common/Theme";

export interface ConversationListItemProps {
  type: "CHAT" | "CHANNEL";
  data: ChannelListItem | ChatListItem;
  op: "JOIN" | "NEW";
  protected?: boolean;
}

export function ConversationListItem(props: ConversationListItemProps) {
  const myTheme = useMyTheme();
  const [passwordType, setPasswordType] = useState<"text" | "password">("text");
  const [enterProtected, setEnterProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [hoover, setHoover] = useState(false);
  const conversations = useConversations();
  const notifications = useNotifications();
  const components = useComponents();
  const socket = useSocket();
  const theme = useTheme();
  const user = useUser();

  return (
    <>
      <ListItem
        onClick={() =>
          ChannelHelper.joinChannel(
            socket.socket,
            user,
            conversations,
            components,
            notifications,
            props,
            setEnterProtected
          )
        }
        sx={{
          "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.action.hover,
          },
        }}
        onMouseEnter={() => {
          setHoover(true);
        }}
        onMouseLeave={() => {
          setHoover(false);
        }}
      >
        <Grid container spacing={2} alignItems="center" columns={10}>
          <Grid item xs={1}>
            <Badge
              badgeContent={props.data.lastSeenMessages}
              color={user.color}
            >
              <Avatar src={props.data.avatar} />
            </Badge>
          </Grid>
          <Grid item xs={props.op === "NEW" && props.protected ? 6 : 7}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: hoover
                  ? myTheme.accentColor
                  : theme.palette.text.disabled,
                marginLeft: props.op === "NEW" ? "20px" : "0px",
              }}
            >
              {props.type === "CHAT"
                ? (props.data as ChatListItem).username
                : (props.data as ChannelListItem).name}
            </Typography>
          </Grid>
          {props.protected ? (
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LockIcon />
            </Grid>
          ) : null}
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color:
                    (props.data as ChannelListItem).online > 0
                      ? "success.main"
                      : "error.main",
                }}
              >
                {props.type === "CHAT"
                  ? null
                  : (props.data as ChannelListItem).online}
              </Typography>
              {props.type === "CHAT" ? (
                <StatusCircleIcon state={(props.data as ChatListItem).status} />
              ) : (
                <GroupIcon
                  color={
                    (props.data as ChannelListItem).online > 0
                      ? "success"
                      : "error"
                  }
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </ListItem>
      <Collapse in={enterProtected}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            margin: "10px",

            visibility: enterProtected ? "visible" : "hidden",
          }}
        >
          <TextField
            size="small"
            type={passwordType}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <IconButton
            onClick={() =>
              setPasswordType(passwordType === "text" ? "password" : "text")
            }
            sx={{
              marginTop: "10px",
              width: "50px",
              height: "50px",
            }}
          >
            {passwordType === "text" ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </IconButton>
          <Button
            sx={{
              position: "absolute",
              right: "1px",
            }}
            variant="contained"
            onClick={() =>
              ChannelHelper.joinChannel(
                socket.socket,
                user,
                conversations,
                components,
                notifications,
                props,
                setEnterProtected,
                password
              )
            }
          >
            <LoginIcon />
          </Button>
        </Stack>
      </Collapse>
    </>
  );
}
