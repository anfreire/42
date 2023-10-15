import { useEffect, useState } from "react";
import { useNotifications } from "../../Notifications";
import { useComponents } from "../../../common/Components";
import { useUser } from "../../User";
import { AuthGoogleUtils } from "..";
import { Button, Collapse } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function AuthGoogleCollapse() {
  const [tokens, setTokens] = useState<{
    token_type: string | null;
    access_token: string | null;
  }>({
    token_type: null,
    access_token: null,
  });
  const notifications = useNotifications();
  const components = useComponents();
  const user = useUser();

  useEffect(() => {
    AuthGoogleUtils.handleTokens(tokens, user, components, notifications);
  }, [tokens, tokens.access_token, tokens.token_type]);

  return (
    <Collapse
      in={components.collapse.authGoogleOpen}
      sx={{ marginTop: "15px" }}
    >
      <Button
        color={user.color}
        onClick={() => AuthGoogleUtils.openPopup(setTokens)}
        variant="text"
        startIcon={<GoogleIcon />}
        disabled={components.buttons.authGoogleDisabled}
      >
        Login with Google
      </Button>
    </Collapse>
  );
}
