import { Avatar, Grid, ListItem, Typography } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { User, useUser } from "../../../User";
import { useState } from "react";
import MuteTiemoutDialog from "./muteTimeout.dialog";
import ChannelUserContextMenu from "./channelUser.contextMenu";
import { SocialHelper, StatusCircleIcon, useSocial } from "../../../Social";
import { useComponents } from "../../../../common/Components";
import { useSocket } from "../../../../common/Socket";

interface ChannelProfileListItemProps {
  user: User;
  role: "OWNER" | "ADMIN" | "USER" | "BANNED" | "MUTED";
  myRole: "OWNER" | "ADMIN" | "USER" | "BANNED" | "MUTED" | undefined;
}

export default function ChannelProfileListItem(
  props: ChannelProfileListItemProps
) {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const user = useUser();
  const social = useSocial();
  const socket = useSocket();
  const components = useComponents();

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };
  const isMe = props.user.studentId === user.studentId;

  return (
    <>
      <MuteTiemoutDialog open={open} setOpen={setOpen} user={props.user} />
      <ListItem
        sx={{
          "&:hover": {
            cursor: isMe ? "default" : "context-menu",
            backgroundColor: "action.hover",
          },
          width: "400px",
        }}
      >
        {isMe ? null : (
          <ChannelUserContextMenu
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
            role={props.role}
            data={props.user}
            myRole={props.myRole}
            setMuteOpen={setOpen}
          />
        )}
        <Grid
          container
          alignItems="center"
          onContextMenu={handleContextMenu}
          alignContent="center"
          display="flex"
          spacing={2}
          columns={20}
          direction="row"
          justifyContent="space-between"
          onClick={() => {
            isMe
              ? null
              : SocialHelper.handleFriendAvatarClick(
                  socket.socket,
                  user,
                  props.user,
                  social,
                  components
                );
          }}
        >
          <Grid item xs={3}>
            <Avatar src={props.user.avatar} />
          </Grid>
          <Grid item xs={props.role === "MUTED" ? 9 : 11} overflow="hidden">
            <Typography variant="h6">{props.user.username}</Typography>
          </Grid>
          {props.role === "MUTED" ? (
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VolumeOffIcon />
            </Grid>
          ) : null}
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>
              {props.role === "ADMIN"
                ? "Admin"
                : props.role === "OWNER"
                ? "Owner"
                : props.role === "BANNED"
                ? "Banned"
                : "User"}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <StatusCircleIcon state={props.user.status} />
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
}
