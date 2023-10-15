import { Button, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutButton() {
  return (
    <Button
      color="error"
      variant="text"
      sx={{ borderRadius: "8px",
      position:"absolute",
      bottom:"5px"
      }}
      onClick={() => window.location.reload()}
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
          Sign Out
        </Typography>
        <LogoutIcon fontSize="large" />
      </Stack>
    </Button>
  );
}
