import { Box, Dialog, DialogContent } from "@mui/material";
import { useComponents } from "../../../common/Components";
import { AchievementTab } from "../../Profile";

export default function AchievementsDialog() {
  const components = useComponents();

  return (
    <Dialog
      sx={{
        textAlign: "center",
      }}
      open={components.dialogs.achievementsOpen}
      onClose={() => {
        components.setDialogs({
          ...components.dialogs,
          achievementsOpen: false,
        });
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "450px",
          height: "310px",
        }}
      >
        <DialogContent>
          <AchievementTab type="USER" />
        </DialogContent>
      </Box>
    </Dialog>
  );
}
