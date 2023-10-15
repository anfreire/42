import {
  ClickAwayListener,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import ChangeAvatarButton from "./changeAvatar.stack";
import Choose2FAButtonGroup from "./choose2FA.stack";
import EditUsernameTextField from "./editUsername.textfield";
import FinishEditUserButton from "./finishEditUser.button";
import { useEffect, useState } from "react";
import { useUser } from "..";
import { SelectColorStack } from "./selectColor.stack";
import { Color } from "../../../common/Theme";
import { useComponents } from "../../../common/Components";

export default function EditUserDialog() {
  const theme = useTheme();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [color, setColor] = useState<Color>("primary");
  const components = useComponents();
  const user = useUser();

  useEffect(() => {
    if (components.dialogs.editOpen && user.username && user.color) {
      setUsernameInput(user.username);
      setColor(user.color);
    }
  }, [components.dialogs.editOpen]);

  return (
    <ClickAwayListener onClickAway={() => {}}>
      <Dialog
        sx={{ textAlign: "center", width: "100%" }}
        open={components.dialogs.registerOpen || components.dialogs.editOpen}
        onClose={() => {
          components.setDialogs({
            ...components.dialogs,
            registerOpen: false,
            editOpen: false,
          });
        }}
        disableEscapeKeyDown={true}
      >
        {components.dialogs.registerOpen ? (
          <DialogTitle>Registration</DialogTitle>
        ) : null}
        <DialogContent>
          <EditUsernameTextField
            input={usernameInput}
            setInput={setUsernameInput}
          />
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "4px",
              padding: "10px",
              backgroundColor: components.dialogs.registerOpen
                ? theme.palette.action.hover
                : null,
              marginTop: "20px",
              overflow: "hidden",
            }}
          >
            {components.dialogs.registerOpen ? (
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                  color: theme.palette.text.secondary,
                }}
                variant="body1"
              >
                The next options are optional and can be changed later
              </Typography>
            ) : null}
            <Choose2FAButtonGroup />
            <ChangeAvatarButton />
            <SelectColorStack color={color} setColor={setColor} />
          </Box>
          <FinishEditUserButton input={usernameInput} color={color} />
        </DialogContent>
      </Dialog>
    </ClickAwayListener>
  );
}
