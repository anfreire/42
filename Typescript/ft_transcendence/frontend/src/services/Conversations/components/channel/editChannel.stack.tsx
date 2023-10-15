import {
  Avatar,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PolicyIcon from "@mui/icons-material/Policy";
import { useState } from "react";
import { ChannelHelper } from "../..";

interface EditChannelStackProps {
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  channelName: string;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
  type: "PUBLIC" | "PRIVATE" | "PROTECTED";
  setType: React.Dispatch<
    React.SetStateAction<"PUBLIC" | "PRIVATE" | "PROTECTED">
  >;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordType: "text" | "password";
  setPasswordType: React.Dispatch<React.SetStateAction<"text" | "password">>;
}

export default function EditChannelStack(props: EditChannelStackProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const uploadAvatar = async () => {
    await ChannelHelper.uploadAvatar(props.setAvatar);
    setAnchorEl(null);
  };

  const setDefaultAvatar = async () => {
    await ChannelHelper.setDefaultAvatar(props.setAvatar);
    setAnchorEl(null);
  };

  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <Menu
        id="basic-menu"
        aria-labelledby="basic-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={uploadAvatar}>Upload a new one</MenuItem>
        <MenuItem onClick={setDefaultAvatar}>Use the default</MenuItem>
      </Menu>
      <Avatar
        id="basic-button"
        src={props.avatar}
        sx={{
          width: "100px",
          height: "100px",
          cursor: "pointer",
          position: "relative",
        }}
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          marginTop: "20px",
        }}
      >
        <TextField
          size="medium"
          label="Channel Name"
          variant="filled"
          onChange={(curr) => props.setChannelName(curr.target.value)}
          sx={{
            width: "200px",
          }}
          value={props.channelName}
        />
        <ToggleButtonGroup
          value={props.type}
          exclusive
          onChange={(_, value) => props.setType(value)}
          sx={{
            marginTop: "20px",
            marginLeft: "20px",
          }}
          size="large"
        >
          <ToggleButton value="PUBLIC" title="Visible to everyone.">
            <PublicIcon />
          </ToggleButton>
          <ToggleButton value="PRIVATE" title="Visible only to members.">
            <PolicyIcon />
          </ToggleButton>
          <ToggleButton
            value="PROTECTED"
            title="Visible to everyone. You need a password to join."
          >
            <VpnKeyIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Collapse in={props.type === "PROTECTED"}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            marginTop: "20px",
          }}
        >
          <TextField
            size="medium"
            label="Password"
            sx={{
              width: "100%",
              marginTop: "10px",
            }}
            onChange={(curr) => props.setPassword(curr.target.value)}
            value={props.password}
            type={props.passwordType}
          />
          <IconButton
            onClick={() =>
              props.setPasswordType(
                props.passwordType === "text" ? "password" : "text"
              )
            }
            sx={{
              marginTop: "10px",
              width: "50px",
              height: "50px",
            }}
          >
            {props.passwordType === "text" ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </IconButton>
        </Stack>
      </Collapse>
    </Stack>
  );
}
