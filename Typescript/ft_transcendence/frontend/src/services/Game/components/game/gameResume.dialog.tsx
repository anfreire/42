import {
  Avatar,
  Button,
  ClickAwayListener,
  Dialog,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { User } from "../../../User";
import { GameListItem, useGame } from "../..";
import { useComponents } from "../../../../common/Components";
import { useTheme as useMyTheme } from "../../../../common/Theme";

interface GameResumeDialogProps {
  leftPlayer: User;
  leftPlayerPoints: number;
  rightPlayer: User;
  rightPlayerPoints: number;
}

export default function GameResumeDialog(props: GameResumeDialogProps) {
  const myTheme = useMyTheme();
  const game = useGame();
  const components = useComponents();

  return (
    <ClickAwayListener onClickAway={() => {}}>
      <Dialog
        open={components.dialogs.gameResumeOpen}
        onClose={() => {
          components.setDialogs({
            ...components.dialogs,
            gameResumeOpen: false,
          });
        }}
      >
        <Grid
          container
          columns={21}
          direction="row"
          sx={{
            width: "500px",
            height: "400px",
            alignItems: "center",
          }}
        >
          <Grid
            item
            overflow="hidden"
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={10}
          >
            <Typography
              sx={{
                color:
                  props.leftPlayerPoints > props.rightPlayerPoints
                    ? "success.main"
                    : "error.main",
                fontSize: "40px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {props.leftPlayerPoints > props.rightPlayerPoints
                ? "WINNER"
                : "LOSER"}
            </Typography>
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
              }}
              src={props.leftPlayer?.avatar}
            />
            <Typography
              sx={{
                color: "action.disabled",
                fontSize: "25px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {props.leftPlayer?.username}
            </Typography>
            <Typography
              sx={{
                color: "action.active",
                fontSize: "60px",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              {props.leftPlayerPoints}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              height: "75%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={1}
          >
            <Divider orientation="vertical" />
            <Typography
              sx={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: myTheme.accentColor,
                fontSize: "60px",
                fontWeight: "bold",
                position: "absolute",
              }}
            >
              VS
            </Typography>
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                bottom: "8px",
              }}
              onClick={() => {
                game.setCurrGame({} as GameListItem);
                components.setDialogs({
                  ...components.dialogs,
                  gameResumeOpen: false,
                });
                game.isWatching
                  ? game.setLocation("WATCH_LIST")
                  : game.setLocation("START");
              }}
            >
              OK
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={10}
            overflow="hidden"
          >
            <Typography
              sx={{
                color:
                  props.rightPlayerPoints > props.leftPlayerPoints
                    ? "success.main"
                    : "error.main",
                fontSize: "40px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {props.rightPlayerPoints > props.leftPlayerPoints
                ? "WINNER"
                : "LOSER"}
            </Typography>
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
              }}
              src={props.rightPlayer?.avatar}
            />
            <Typography
              sx={{
                color: "action.disabled",
                fontSize: "25px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {props.rightPlayer?.username}
            </Typography>
            <Typography
              sx={{
                color: "action.active",
                fontSize: "60px",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              {props.rightPlayerPoints}
            </Typography>
          </Grid>
        </Grid>
      </Dialog>
    </ClickAwayListener>
  );
}
