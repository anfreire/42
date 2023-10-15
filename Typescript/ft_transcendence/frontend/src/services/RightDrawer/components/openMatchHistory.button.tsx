import { Button, Stack, Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { useComponents } from "../../../common/Components";
import { useUser } from "../../User";

export default function OpenMatchHistoryButton() {
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
          gameHistoryOpen: true,
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
          Match History
        </Typography>
        <HistoryIcon fontSize="large" />
      </Stack>
    </Button>
  );
}
