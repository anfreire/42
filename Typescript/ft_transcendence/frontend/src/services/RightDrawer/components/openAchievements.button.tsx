import { Button, Stack, Typography } from "@mui/material";
import { useComponents } from "../../../common/Components";
import { useUser } from "../../User";
import StarsIcon from "@mui/icons-material/Stars";

export default function OpenAchievementsButton() {
  const components = useComponents();
  const user = useUser();
  return (
    <Button
      color={user.color}
      variant="text"
      sx={{ borderRadius: "8px", marginTop: "10px" }}
      onClick={() => {
        components.setDrawers({
          ...components.drawers,
          rightOpen: false,
        });
        components.setDialogs({
          ...components.dialogs,
          achievementsOpen: true,
        });
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "10px",
        }}
        spacing={3}
      >
        <Typography
          sx={{
            textTransform: "none",
          }}
          variant="h6"
        >
          Achievements
        </Typography>
        <StarsIcon fontSize="large" />
      </Stack>
    </Button>
  );
}
