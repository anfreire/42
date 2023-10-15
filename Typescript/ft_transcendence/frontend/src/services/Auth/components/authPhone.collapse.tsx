import { Button, Collapse, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import { useNotifications } from "../../Notifications";
import { useComponents } from "../../../common/Components";
import { useUser } from "../../User";
import { AuthPhoneUtils } from "..";

export default function AuthPhoneCollapse() {
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [codeSent, setCodeSent] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const notifications = useNotifications();
  const components = useComponents();
  const user = useUser();

  useEffect(() => {
    if (components.dialogs.editOpen && user.phone) setPhoneInput(user.phone);
  }, []);

  useEffect(() => {
    if (phoneInput && phoneInput !== "") user.setPhone(phoneInput);
  }, [phoneInput]);

  useEffect(() => {
    if (components.dialogs.editOpen && !user.phone) setPhoneInput("");
  }, [user.phone]);

  return (
    <Collapse in={components.collapse.authPhoneOpen} sx={{ marginTop: "10px" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          color: "text.primary",
        }}
        maxHeight="50%"
      >
        <TextField disabled value="+351" sx={{ width: "65px" }} />
        <TextField
          id="phone-number"
          label="Phone Number"
          variant="outlined"
          disabled={
            components.dialogs.authOpen
              ? true
              : components.buttons.sendSMSDisabled
          }
          sx={{ width: "140px", textAlign: "center" }}
          inputProps={{ maxLength: 9 }}
          onChange={(e) => setPhoneInput(e.target.value)}
          value={
            components.dialogs.authOpen
              ? "* ".repeat(6) + user.phone?.slice(-3)
              : phoneInput
          }
        />

        <Button
          variant="text"
          color={user.color}
          onClick={async () => {
            AuthPhoneUtils.sendSMS(
              user,
              notifications,
              components,
              setCodeSent,
              setCodeInput
            );
          }}
          endIcon={<SendIcon />}
          disabled={components.buttons.sendSMSDisabled}
        >
          Send
        </Button>
      </Stack>
      <Collapse
        in={components.buttons.checkSMSCodeOpen}
        sx={{ marginTop: "2px" }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            marginLeft: "20px",
            color: "text.primary",
          }}
          maxHeight="50%"
        >
          <TextField
            id="code"
            label="Code"
            variant="outlined"
            sx={{ width: "70px", textAlign: "center" }}
            onChange={(e) => setCodeInput(e.target.value)}
            inputProps={{ maxLength: 4 }}
            value={codeInput}
          />
          <Button
            variant="text"
            color={user.color}
            onClick={() =>
              AuthPhoneUtils.checkCode(
                user,
                components,
                notifications,
                phoneInput,
                setCodeInput,
                codeSent,
                codeInput
              )
            }
            endIcon={<DoneIcon />}
          >
            OK
          </Button>
        </Stack>
      </Collapse>
    </Collapse>
  );
}
