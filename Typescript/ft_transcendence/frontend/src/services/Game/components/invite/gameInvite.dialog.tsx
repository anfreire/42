import SendIcon from "@mui/icons-material/Send";
import { useComponents } from "../../../../common/Components";
import { GameHelper, useGame } from "../..";
import { useUser } from "../../../User";
import { useSocket } from "../../../../common/Socket";
import { useSocial } from "../../../Social";
import {
  ChatListItem,
  ChatUtils,
  ConversationsHelper,
  useConversations,
} from "../../../Conversations";
import { useNotifications } from "../../../Notifications";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

export default function GameInviteDialog() {
  const components = useComponents();
  const game = useGame();
  const user = useUser();
  const socket = useSocket();
  const social = useSocial();
  const conversations = useConversations();
  const notifications = useNotifications();

  const startBotGame = async () => {
    game.setSelection({
      type: "SOLO",
      mode: game.selection?.mode as "CLASSIC" | "CUSTOM",
      level: "MEDIUM",
    });
  };

  useEffect(() => {
    if (
      components.dialogs.inviteGameOpen === false ||
      game.selection.type === "DUO"
    )
      return;
    (async () => {
      const res = await GameHelper.createSoloGame(socket.socket, user, game);
      game.setIsWatching(false);
      res ? game.setLocation("GAME") : null;
      components.setDialogs({
        ...components.dialogs,
        profileOpen: false,
        inviteGameOpen: false,
      });
    })();
  }, [game.selection]);

  const invite = () => {
    if (!game.selection?.mode) {
      notifications.setErrorMessage("Select a mode");
      return;
    }
    if (game.gameDialogOrigin === "CONVERSATION") {
      if (
        conversations.currConversation.type === "CHAT" &&
        (conversations.currConversation.data as ChatListItem).username === "Bot"
      ) {
        startBotGame();
      } else {
        ConversationsHelper.sendGameInvite(
          socket.socket,
          user,
          conversations,
          game,
          notifications
        );
        components.setDialogs({
          ...components.dialogs,
          profileOpen: false,
          inviteGameOpen: false,
        });
      }
    } else {
      if (social.friendProfile?.username === "Bot") {
        startBotGame();
      } else {
        ChatUtils.sendGameInvite(
          socket.socket,
          user.studentId as string,
          social.friendProfile?.studentId as string,
          {
            type: "DUO",
            mode: game.selection?.mode as "CLASSIC" | "CUSTOM",
            level: undefined,
          }
        ).then((res) => {
          if ((res as any).error) {
            notifications.setErrorMessage((res as any).error);
            return;
          }
          conversations.setCurrConversation({
            type: "CHAT",
            data: {
              ...social.friendProfile,
              createdAt: new Date(),
              lastSeenMessages: 0,
            } as ChatListItem,
          });
          conversations.setLocation("CHAT");
        });
        components.setDialogs({
          ...components.dialogs,
          profileOpen: false,
          inviteGameOpen: false,
          channelProfileOpen: false,
        });
      }
    }
  };

  return (
    <Dialog
      open={components.dialogs.inviteGameOpen}
      onClose={() => {
        components.setDialogs({
          ...components.dialogs,
          inviteGameOpen: false,
        });
      }}
    >
      <Stack
        direction="column"
        spacing={3}
        sx={{
          // center everything
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
          height: "190px",
        }}
      >
        <FormControl variant="filled">
          <InputLabel
            id="game-mode-label"
            sx={{
              padding: "10px 10px",
            }}
          >
            Game Mode
          </InputLabel>
          <Select
            labelId="game-mode-label"
            value={game.selection?.mode ? game.selection.mode : ""}
            variant="filled"
            onChange={(e) => {
              game.setSelection({
                mode: e.target.value as "CLASSIC" | "CUSTOM",
                type: "DUO",
                level: undefined,
              });
            }}
            sx={{
              padding: "10px 10px",
              width: "150px",
            }}
          >
            <MenuItem value="CLASSIC">Classic</MenuItem>
            <MenuItem value="CUSTOM">Custom</MenuItem>
          </Select>
        </FormControl>
        <Button
          color={user.color}
          variant="contained"
          sx={{
            width: "150px",
            fontSize: "15px",
          }}
          onClick={() => {
            invite();
          }}
        >
          <Typography
            sx={{
              marginLeft: "20px",
            }}
          >
            Send
          </Typography>
          <SendIcon
            sx={{
              marginLeft: "20px",
            }}
          />
        </Button>
      </Stack>
    </Dialog>
  );
}
