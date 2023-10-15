import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import GoogleIcon from "@mui/icons-material/Google";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import React, { useEffect, useState } from "react";
import AuthGoogleCollapse from "../../Auth/components/authGoogle.collapse";
import AuthPhoneCollapse from "../../Auth/components/authPhone.collapse";
import { UserHelper } from "../utils/user.helper";
import { useComponents } from "../../../common/Components";
import { useNotifications } from "../../Notifications";
import { useUser } from "..";

export default function Choose2FAButtonGroup() {
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const components = useComponents();
  const notifications = useNotifications();
  const user = useUser();

  useEffect(() => {
    UserHelper.restoreUser2FAOption(components, user);
  }, []);

  const handleChoiceChange = (
    _: React.MouseEvent<HTMLElement>,
    newChoice: "NONE" | "GOOGLE" | "PHONE"
  ) => {
    UserHelper.handle2FAChange(
      newChoice,
      user,
      components,
      notifications,
      showWarning,
      setShowWarning
    );
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          color: "text.primary",
        }}
      >
        <Typography variant="h5">2FA</Typography>
        <ToggleButtonGroup
          sx={{
            overflow: "hidden",
          }}
          color={user.color}
          value={components.buttonGroups.twoFAChoice}
          exclusive
          size="large"
          onChange={handleChoiceChange}
          disabled={components.buttonGroups.twoFADisabled}
        >
          <ToggleButton
            value="NONE"
            disabled={components.buttons.twoFANoneChoiceDisabled}
          >
            <NotInterestedIcon />
          </ToggleButton>
          <ToggleButton
            value="GOOGLE"
            disabled={components.buttons.twoFAGoogleChoiceDisabled}
          >
            <GoogleIcon />
          </ToggleButton>
          <ToggleButton
            value="PHONE"
            disabled={components.buttons.twoFAPhoneChoiceDisabled}
          >
            <PermPhoneMsgIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <AuthGoogleCollapse />
      <AuthPhoneCollapse />
    </>
  );
}
