import { Icon, Stack } from "@mui/material";
import { ReactSVG } from "react-svg";

export const achievements = {
  winAgainstBotEasy: {
    src: "src/assets/ACH/winAgainstBotEasy.svg",
    description: "Win against the bot in easy mode",
  },
  winAgainstBotMedium: {
    src: "src/assets/ACH/winAgainstBotMedium.svg",
    description: "Win against the bot in medium mode",
  },
  winAgainstBotHard: {
    src: "src/assets/ACH/winAgainstBotHard.svg",
    description: "Win against the bot in hard mode",
  },
  winFirstGame: {
    src: "src/assets/ACH/winFirstGame.svg",
    description: "Win your first game",
  },
  winThreeTimes: {
    src: "src/assets/ACH/winThreeGames.svg",
    description: "Win three games",
  },
  winAgainstFriend: {
    src: "src/assets/ACH/winAgainstFriend.svg",
    description: "Win against a friend",
  },
  firstInLeaderboard: {
    src: "src/assets/ACH/firstInLeaderboard.svg",
    description: "Be first in the leaderboard",
  },
  inviteGameInChat: {
    src: "src/assets/ACH/inviteGameInChat.svg",
    description: "Invite a friend to a game in chat",
  },
  inviteGameInChannel: {
    src: "src/assets/ACH/inviteGameInChannel.svg",
    description: "Invite a friend to a game in a channel",
  },
};

export type achievement = keyof typeof achievements;

export const Achievements = Object.keys(achievements);

export function Achievement({
  achievement,
  active,
}: {
  achievement: achievement;
  active: boolean;
}) {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      title={achievements[achievement].description}
    >
      <Icon
        sx={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: active ? "#FFD700" : "#C0C0C0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        title={achievements[achievement].description}
      >
        <ReactSVG
          title={achievements[achievement].description}
          src={achievements[achievement].src}
          style={{
            width: "50px",
            height: "50px",
          }}
        />
      </Icon>
    </Stack>
  );
}
