import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useState } from "react";
import { useConversations } from "../..";
import { useComponents } from "../../../../common/Components";
import { Box, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useTheme as useMyTheme } from "../../../../common/Theme";

export default function NewConversationBox() {
  const [firendHoover, setFirendHoover] = useState(false);
  const [groupHoover, setGroupHoover] = useState(false);
  const conversations = useConversations();
  const components = useComponents();
  const theme = useTheme();
  const myTheme = useMyTheme();

  return (
    <Box
      sx={{
        height: "calc(100% - 50px)",
        width: "100%",
        overflow: "auto",
        backgroundColor: "background.default",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: myTheme.accentColor,
      }}
    >
      <Grid
        container
        columns={21}
        sx={{
          height: "100%",
        }}
      >
        <Grid
          item
          xs={10}
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {
            conversations.setLocation("NEW_CHAT");
            components.setDialogs({
              ...components.dialogs,
              chatWithFriendOpen: true,
            });
          }}
          onMouseEnter={() => {
            setFirendHoover(true);
          }}
          onMouseLeave={() => {
            setFirendHoover(false);
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <PersonAddAlt1Icon
              sx={{
                fontSize: "80px",
                color: firendHoover
                  ? myTheme.accentColor
                  : theme.palette.text.disabled,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: firendHoover
                  ? myTheme.accentColor
                  : theme.palette.text.disabled,
              }}
            >
              Chat with a Friend
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            justifyContent: "center",
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
        <Grid
          item
          xs={10}
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => {
            conversations.setLocation("NEW_CHANNEL");
            components.setDialogs({
              ...components.dialogs,
              connectChannelOpen: true,
            });
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onMouseEnter={() => {
              setGroupHoover(true);
            }}
            onMouseLeave={() => {
              setGroupHoover(false);
            }}
          >
            <GroupAddIcon
              sx={{
                fontSize: "80px",
                color: groupHoover
                  ? myTheme.accentColor
                  : theme.palette.text.disabled,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: groupHoover
                  ? myTheme.accentColor
                  : theme.palette.text.disabled,
              }}
            >
              Connect to a Channel
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
