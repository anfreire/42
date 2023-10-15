import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button, Stack, Typography } from "@mui/material";
import { useComponents } from "../../../common/Components";
import { useUser } from "../../User";

export default function OpenEditUserButton() {
  const components = useComponents();
  const user = useUser();

  return (
    <>
      <Button
        color={user.color}
        sx={{ borderRadius: "8px", marginTop: "15px" }}
        onClick={() => {
          components.setDialogs({
            ...components.dialogs,
            editOpen: true,
          });
          components.setDrawers({
            ...components.drawers,
            rightOpen: false,
          });
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            alignItems: "center",
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
            Edit User
          </Typography>
          <ManageAccountsIcon fontSize="large" />
        </Stack>
      </Button>
    </>
  );
}
