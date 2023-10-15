import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  Typography,
} from "@mui/material";
import { useComponents } from "../../../common/Components";
import FriendsList from "./friends.list";
import { BlockedUsersBox } from "./blockedUsers.box";
import { useSocial } from "../../Social";
import LeaderboardBox from "./leaderboard.box";

export default function LeftDrawer() {
  const components = useComponents();
  const social = useSocial();

  return (
    <Drawer
      anchor="left"
      open={components.drawers.leftOpen}
      onClose={() => {
        components.setDrawers({ ...components.drawers, leftOpen: false });
      }}
    >
      <Box
        width={300}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Accordion
          disableGutters={true}
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccordionSummary>
            <Typography variant="h4">Leaderboard</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              width: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LeaderboardBox />
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded={social.friends.length > 0}
          disableGutters={true}
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <AccordionSummary>
            <Typography variant="h4">Friends</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              width: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FriendsList />
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          disableGutters={true}
        >
          <AccordionSummary>
            <Typography variant="h4">Blocked users</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              width: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BlockedUsersBox />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  );
}
