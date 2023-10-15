import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useSocial } from "../../Social";
import { useGame } from "../../Game";
import { useComponents } from "../../../common/Components";

interface Player {
  username: string;
  avatar: string;
  points: number;
  winner: boolean;
}

export default function GamesTab() {
  const social = useSocial();
  const theme = useTheme();
  const myGame = useGame();
  const components = useComponents();

  return (
    <>
      {social.friendProfile?.games.length === 0 ? (
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
            padding: "25px",
          }}
        >
          No games played yet
        </Typography>
      ) : (
        <List
          sx={{
            maxHeight: "250px",
            width: "100%",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {social.friendProfile?.games.map((game, index) => {
            const winnerPoints =
              game.points[0] > game.points[1] ? game.points[0] : game.points[1];
            const loserPoints =
              game.points[0] < game.points[1] ? game.points[0] : game.points[1];
            const players: Player[] = [
              {
                username: game.players[0].username,
                avatar: game.players[0].avatar,
                winner: game.winner?.username === game.players[0].username,
                points:
                  game.winner?.username === game.players[0].username
                    ? winnerPoints
                    : loserPoints,
              },
              {
                username: game.players[1].username,
                avatar: game.players[1].avatar,
                winner: game.winner?.username === game.players[1].username,
                points:
                  game.winner?.username === game.players[1].username
                    ? winnerPoints
                    : loserPoints,
              },
            ];
            game.points ||= [0, 0];
            game.points[0] ||= 0;
            game.points[1] ||= 0;
            return (
              <div key={game.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "300px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                  onClick={() => {
                    players[0]?.points === 5 || players[1]?.points === 5
                      ? null
                      : (() => {
                          myGame.setIsWatching(true);
                          myGame.setCurrGame(game);
                          myGame.setLocation("GAME");
                          components.setDialogs({
                            ...components.dialogs,
                            profileOpen: false,
                            channelProfileOpen: false,
                          });
                        })();
                  }}
                >
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                    direction="row"
                    columns={11}
                  >
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar src={players[0].avatar} />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {players[0].username}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "30px",
                          fontWeight: "bold",
                        }}
                        color={
                          players[0].winner
                            ? theme.palette.success.main
                            : theme.palette.error.main
                        }
                      >
                        {players[0].points}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Divider
                        sx={{ width: "1px", height: "30px" }}
                        orientation="vertical"
                        flexItem
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "30px",
                          fontWeight: "bold",
                        }}
                        color={
                          players[1].winner
                            ? theme.palette.success.main
                            : theme.palette.error.main
                        }
                      >
                        {players[1].points}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {players[1].username}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar src={players[1].avatar} />
                    </Grid>
                  </Grid>
                </ListItem>
                {index !==
                  (social.friendProfile?.games.length as number) - 1 && (
                  <Divider
                    sx={{
                      width: "100%",
                    }}
                  />
                )}
              </div>
            );
          })}
        </List>
      )}
    </>
  );
}
