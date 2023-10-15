import { AppBar, Box, Stack } from "@mui/material";
import { OpenLeftDrawerButton } from "../../LeftDrawer";
import { OpenRightDrawerButton } from "../../RightDrawer";
import { ChangeThemeSwitch } from "..";

export default function TopBar() {
  return (
    <Box>
      <AppBar
        color="transparent"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "55px",
          boxShadow: "none",
        }}
      >
        <OpenLeftDrawerButton />
        <Stack
          direction="row"
          spacing={4}
          sx={{
            marginRight: "10px",
          }}
        >
          <ChangeThemeSwitch />
          <OpenRightDrawerButton />
        </Stack>
      </AppBar>
    </Box>
  );
}
