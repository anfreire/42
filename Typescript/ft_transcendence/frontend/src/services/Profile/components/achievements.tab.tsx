import { List, ListItem } from "@mui/material";
import {
  Achievement,
  Achievements,
  achievement,
} from "../../../assets/icons/achievements";
import { useUser } from "../../User";
import { useSocial } from "../../Social";
import { useEffect, useState } from "react";
import { achievements } from "../../User/context/user.context";

const defaultAchievements: achievements = {
  winFirstGame: false,
  winThreeTimes: false,
  winAgainstFriend: false,
  winAgainstBotEasy: false,
  winAgainstBotMedium: false,
  winAgainstBotHard: false,
  firstInLeaderboard: false,
  inviteGameInChat: false,
  inviteGameInChannel: false,
};

export default function AchievementTab({ type }: { type: "FRIEND" | "USER" }) {
  const [localAchievements, setLocalAchievements] =
    useState<achievements>(defaultAchievements);
  const social = useSocial();
  const user = useUser();
  useEffect(() => {
    if (type === "FRIEND" && social.friendProfile) {
      setLocalAchievements(social.friendProfile?.achievements);
    } else if (type === "USER" && user.achievements) {
      setLocalAchievements(user.achievements);
    }
  }, []);

  return (
    <List
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: "20px",
        maxHeight: "250px",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {Achievements.map((achievement) => (
        <ListItem
          sx={{
            flexBasis: 100 / 3 + "%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={achievement}
        >
          <Achievement
            achievement={achievement as achievement}
            active={localAchievements[achievement as achievement]}
          />
        </ListItem>
      ))}
    </List>
  );
}
