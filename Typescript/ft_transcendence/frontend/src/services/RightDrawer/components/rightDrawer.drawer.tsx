import { Box, Divider, Drawer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Variant } from "@mui/material/styles/createTypography";
import {
  LogoutButton,
  OpenEditUserButton,
  OpenFriendRequestButton,
  OpenMatchHistoryButton,
} from "..";
import { useComponents } from "../../../common/Components";
import { useUser } from "../../User";
import OpenAchievementsButton from "./openAchievements.button";

export default function RightDrawer() {
  const [variant, setVariant] = useState<Variant>("h6");
  const components = useComponents();
  const user = useUser();

  useEffect(() => {
    if (user.username && user.username.length > 0) {
      if (user.username.length < 6) {
        setVariant("h2");
      } else if (user.username.length < 9) {
        setVariant("h3");
      } else if (user.username.length < 12) {
        setVariant("h4");
      } else if (user.username.length < 18) {
        setVariant("h5");
      } else {
        setVariant("h6");
      }
    }
  }, [user.username]);

  return (
    <Drawer
      anchor="right"
      open={components.drawers.rightOpen}
      onClose={() => {
        components.setDrawers({ ...components.drawers, rightOpen: false });
      }}
    >
      <Box
        width={320}
        height="100%"
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant={variant}>{user.username}</Typography>
        <Divider
          variant="middle"
          sx={{
            width: "100%",
            marginTop: "10px",
            borderBottomWidth: "2px",
          }}
        />
        <OpenEditUserButton />
        <OpenFriendRequestButton />
        <OpenAchievementsButton />
        <OpenMatchHistoryButton />
        <LogoutButton />
      </Box>
    </Drawer>
  );
}
