import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GameListItem, GameUtils, useFullScreen, useGame } from "../..";
import { useUser } from "../../../User";
import { useEffect, useState } from "react";
import { useSocket } from "../../../../common/Socket";
import { useTheme as useMyTheme } from "../../../../common/Theme";

export default function WatchListBoxContent() {
  const [games, setGames] = useState<GameListItem[]>([]);
  const fullscreen = useFullScreen();
  const game = useGame();
  const user = useUser();
  const socket = useSocket();
  const theme = useTheme();
  const myTheme = useMyTheme();

  useEffect(() => {
    GameUtils.getGames(socket.socket).then((data) => {
      setGames(data);
      socket.socket.subscribe("game/list", (data: any) => {
        setGames(data.data);
      });
    });
    return () => {
      socket.socket.unsubscribe("game/list");
    };
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        color={user.color}
        sx={{
          position: "absolute",
          top: fullscreen.dimensions.height / 25,
          left: fullscreen.dimensions.height / 25,
          zIndex: 1,
        }}
        onClick={() => {
          game.setLocation("START");
        }}
      >
        <ArrowBackIcon
          sx={{
            fontSize: fullscreen.dimensions.height / 15,
          }}
        />
      </IconButton>
      <List
        sx={{
          maxHeight: fullscreen.dimensions.height - 5,
          width: fullscreen.dimensions.width - 5,
          overflow: "auto",
          justifyContent: "center",
          alignItems: "center",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {games.map((gameItem, index) => {
          return (
            <div key={index}>
              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  columnSpacing={1}
                  columns={15}
                  sx={{
                    width: "100%",
                    cursor: "pointer",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                  onClick={() => {
                    game.setIsWatching(true);
                    game.setCurrGame(gameItem);
                    game.setLocation("GAME");
                  }}
                >
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: fullscreen.dimensions.height / 10,
                        height: fullscreen.dimensions.height / 10,
                      }}
                      src={gameItem.players[0].avatar}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: fullscreen.dimensions.height / 15,
                        color: myTheme.accentColor,
                      }}
                    >
                      {gameItem.players[0].username}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: fullscreen.dimensions.height / 15,
                        color:
                          gameItem.points[0] > gameItem.points[1]
                            ? theme.palette.success.main
                            : gameItem.points[0] < gameItem.points[1]
                            ? theme.palette.error.main
                            : "white",
                      }}
                    >
                      {gameItem.points[0] ?? 0}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: fullscreen.dimensions.height / 10,
                        fontWeight: "bold",
                        color: myTheme.accentColor,
                      }}
                    >
                      VS
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: fullscreen.dimensions.height / 15,
                        color:
                          gameItem.points[1] > gameItem.points[0]
                            ? theme.palette.success.main
                            : gameItem.points[1] < gameItem.points[0]
                            ? theme.palette.error.main
                            : "white",
                      }}
                    >
                      {gameItem.points[1] ?? 0}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: fullscreen.dimensions.height / 15,
                        color: myTheme.accentColor,
                      }}
                    >
                      {gameItem.players[1].username}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: fullscreen.dimensions.height / 10,
                        height: fullscreen.dimensions.height / 10,
                      }}
                      src={gameItem.players[1].avatar}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              {index !== games.length - 1 && (
                <Divider
                  sx={{
                    width: "100%",
                    height: "2px",
                  }}
                />
              )}
            </div>
          );
        })}
      </List>
    </Box>
  );
}
