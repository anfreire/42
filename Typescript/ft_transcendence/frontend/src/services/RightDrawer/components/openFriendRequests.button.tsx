import { Badge, Button, Stack, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useComponents } from "../../../common/Components";
import { useSocial } from "../../Social";
import { useUser } from "../../User";

export default function OpenFriendRequestButton() {
  const components = useComponents();
  const social = useSocial();
  const user = useUser();

  return (
    <>
      <Button
        color={user.color}
        sx={{ borderRadius: "8px", marginTop: "15px" }}
        onClick={() => {
          components.setDialogs({
            ...components.dialogs,
            friendRequestOpen: true,
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
            Friend Requests
          </Typography>
          <Badge badgeContent={social.friendRequests.length} color={user.color}>
            <PersonAddIcon fontSize="large" />
          </Badge>
        </Stack>
      </Button>
    </>
  );
}
