import { Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useFullScreen, useGame } from "../..";
import { useUser } from "../../../User";
import { useTheme as useMyTheme } from "../../../../common/Theme";

export default function SoloOrDuoBoxContent() {
  const myTheme = useMyTheme();
  const fullscreen = useFullScreen();
  const game = useGame();
  const user = useUser();

  return (
    <>
      <IconButton
        color={user.color}
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
        onClick={() => game.setLocation("START")}
      >
        <ArrowBackIcon
          sx={{
            fontSize: fullscreen.dimensions.height / 15,
          }}
        />
      </IconButton>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: fullscreen.handle.active
            ? "100%"
            : fullscreen.dimensions.height - 3,
          width: fullscreen.handle.active
            ? "100%"
            : fullscreen.dimensions.width - 3,
        }}
        columns={21}
      >
        <Grid item xs={10} width="100%" height="100%">
          <Stack
            direction="column"
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => {
              game.setSelection({
                type: "SOLO",
                level: undefined,
                mode: undefined,
              });
              game.setLocation("WHICH_MODE");
            }}
          >
            <SmartToyIcon
              sx={{
                color: myTheme.accentColor,
                fontSize: fullscreen.dimensions.height / 5,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: fullscreen.dimensions.height / 8,
                fontWeight: "bold",
                color: myTheme.accentColor,
              }}
            >
              Solo
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: "100%",
              width: "1px",
              backgroundColor: myTheme.accentColor,
            }}
          />
        </Grid>
        <Grid item xs={10} width={fullscreen.dimensions.width / 2}>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              cursor: "pointer",
            }}
            onClick={() => {
              game.setSelection({
                type: "DUO",
                level: undefined,
                mode: undefined,
              });
              game.setLocation("WHICH_MODE");
            }}
          >
            <PersonSearchIcon
              sx={{
                color: myTheme.accentColor,
                fontSize: fullscreen.dimensions.height / 5,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: fullscreen.dimensions.height / 8,
                fontWeight: "bold",
                color: myTheme.accentColor,
              }}
            >
              Duo
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
