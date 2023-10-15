import ChatIcon from "@mui/icons-material/Chat";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SwipeLeftAltIcon from "@mui/icons-material/SwipeLeftAlt";
import CheckIcon from "@mui/icons-material/Check";
import {
  ChannelHelper,
  ChannelListItem,
  ChatHelper,
  ConversationsProps,
} from "..";
import { mySocket } from "../../../common/Socket";
import { User, UserProps } from "../../User";
import { NotificationsProps } from "../../Notifications";
import { ComponentsProps } from "../../../common/Components";

export function contextMenuItemsBuilder(
  handleClose: () => void,
  props: {
    contextMenu: {
      mouseX: number;
      mouseY: number;
    } | null;
    setContextMenu: React.Dispatch<
      React.SetStateAction<{
        mouseX: number;
        mouseY: number;
      } | null>
    >;
    role: "ADMIN" | "OWNER" | "USER" | "BANNED" | "MUTED";
    data: User;
    myRole: "ADMIN" | "OWNER" | "USER" | "BANNED" | "MUTED" | undefined;
    setMuteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  },
  conversations: ConversationsProps,
  socket: mySocket,
  user: UserProps,
  components: ComponentsProps,
  notifications: NotificationsProps,
  game: GameProps
  
): {
  onClick: React.MouseEventHandler<HTMLLIElement>;
  text: string;
  icon: JSX.Element;
  condition: boolean;
}[] {
  return [
    {
      onClick: () => {
        ChatHelper.clickFriend(
          conversations,
          user,
          socket,
          components,
          props.data as User
        );
        handleClose();
      },
      text: "Start a chat",
      icon: (
        <ChatIcon
          sx={{
            marginRight: 1,
          }}
        />
      ),
      condition: true,
    },
    {
      onClick: () => {
        game.setGameDialogOrigin("PROFILE");
        components.setDialogs({
          ...components.dialogs,
          inviteGameOpen: true,
        });
        handleClose();
      },
      text: "Invite to game",
      icon: (
        <SportsEsportsIcon
          sx={{
            marginRight: 1,
          }}
        />
      ),
      condition: true,
    },
    {
      onClick: () => {
        ChannelHelper.ownerOperation(
          "PROMOTE",
          socket,
          user,
          (conversations.currConversation.data as ChannelListItem).name,
          props.data,
          notifications
        );
        handleClose();
      },
      text: "Promote to admin",
      icon: (
        <ArrowUpwardIcon
          sx={{
            marginRight: 1,
          }}
        />
      ),
      condition: props.myRole === "OWNER" && props.role === "USER",
    },
    {
      onClick: () => {
        ChannelHelper.ownerOperation(
          "DEMOTE",
          socket,
          user,
          (conversations.currConversation.data as ChannelListItem).name,
          props.data,
          notifications
        );
        handleClose();
      },
      text: "Demote to user",
      icon: (
        <ArrowDownwardIcon
          sx={{
            marginRight: 1,
          }}
        />
      ),
      condition: props.myRole === "OWNER" && props.role === "ADMIN",
    },
    {
      onClick: () => {
        props.setMuteOpen(true);
        handleClose();
      },
      text: "Mute user",
      icon: (
        <VolumeOffIcon
          sx={{
            marginRight: 1,
          }}
        />
      ),
      condition:
        (props.myRole === "ADMIN" || props.myRole === "OWNER") &&
        props.role !== "OWNER" &&
        props.role !== "MUTED",
    },
    {
      onClick: () => {
        ChannelHelper.adminOperation(
          "UNMUTE",
          socket,
          user,
          (conversations.currConversation.data as ChannelListItem).name,
          props.data,
          notifications
        );
        handleClose();
      },
      text: "Unmute user",
      icon: (
        <VolumeUpIcon
          sx={{
            marginRight: 1,
          }}
        />
      ),
      condition:
        (props.myRole === "ADMIN" || props.myRole === "OWNER") &&
        props.role === "MUTED",
    },
    {
      onClick: () => {
        ChannelHelper.kickUser(
          socket,
          user,
          props.data,
          conversations,
          notifications
        );
        handleClose();
      },
      text: "Kick from channel",
      icon: (
        <SwipeLeftAltIcon
          sx={{
            marginRight: 1,
          }}
        />
      ),
      condition:
        (props.myRole === "ADMIN" || props.myRole === "OWNER") &&
        props.role !== "OWNER",
    },
    {
      onClick: () => {
        ChannelHelper.adminOperation(
          "BAN",
          socket,
          user,
          (conversations.currConversation.data as ChannelListItem).name,
          props.data,
          notifications
        );
        handleClose();
      },
      text: "Ban from channel",
      icon: (
        <RemoveCircleOutlineIcon
          sx={{
            marginRight: 1,
          }}
        />
      ),
      condition:
        (props.myRole === "ADMIN" || props.myRole === "OWNER") &&
        props.role !== "OWNER" &&
        props.role !== "BANNED",
    },
    {
      onClick: () => {
        ChannelHelper.adminOperation(
          "UNBAN",
          socket,
          user,
          (conversations.currConversation.data as ChannelListItem).name,
          props.data,
          notifications
        );
        handleClose();
      },
      text: "Unban user",
      icon: (
        <CheckIcon
          sx={{
            marginRight: 1,
          }}
        />
      ),
      condition:
        (props.myRole === "ADMIN" || props.myRole === "OWNER") &&
        props.role === "BANNED",
    },
  ];
}
