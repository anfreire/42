import {
  Avatar,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useSocket } from "../../../common/Socket";
import { useComponents } from "../../../common/Components";
import { useEffect, useState } from "react";
import { User, useUser } from "../../User";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  SocialHelper,
  SocialUtils,
  StatusCircleIcon,
  useSocial,
} from "../../Social";

interface LeaderboardUser extends User {
  points: number;
}

const trophyColors = ["gold", "silver", "#cd7f32"];

export default function LeaderboardBox() {
  const [leaderBoard, setLeaderBoard] = useState<LeaderboardUser[]>([]);
  const components = useComponents();
  const socket = useSocket();
  const user = useUser();
  const social = useSocial();

  useEffect(() => {
    SocialUtils.getLeaderboard(socket.socket).then((leaderboard) => {
      setLeaderBoard(leaderboard);
    });
  }, []);

  return (
    <List
      sx={{
        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {leaderBoard.map((friend, index) => {
        return (
          <ListItem
            key={friend.username}
            onClick={() => { user.username !== friend.username && 
              SocialHelper.handleFriendAvatarClick(
                socket.socket,
                user,
                friend,
                social,
                components
              );
            }}
            sx={{
              "&:hover": {
                cursor: user.username !== friend.username ? "pointer" : "auto",
                backgroundColor: "action.hover",
              },
              borderRadius: "10px",
            }}
            title= { user.username !== friend.username ? "View profile" : "" } 
          >
            <Grid
              container
              spacing={2}
              columns={10}
              sx={{
                width: "280px",
              }}
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={2}>
                <Avatar src={friend.avatar} sx={{ marginRight: "10px" }} />
                {index < 3 ? (
                  <>
                    <EmojiEventsIcon
                      sx={{
                        color: trophyColors[index],
                        position: "absolute",
                        top: "25px",
                        left: "37px",
                        fontSize: "30px",
                      }}
                    />
                    <Typography
                      sx={{
                        color: "black",
                        position: "absolute",
                        top: "27px",
                        left: "48px",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </>
                ) : null}
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  overflow: "hidden",
                }}
              >
                <Typography variant="h5">{friend.username}</Typography>
              </Grid>
              <Grid item xs={2}>
                <StatusCircleIcon state={friend.status} />
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
}
