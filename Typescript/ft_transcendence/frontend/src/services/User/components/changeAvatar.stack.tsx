import { Avatar, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserUtils, useUser } from "..";
import { useSocket } from "../../../common/Socket";

export default function ChangeAvatarButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const user = useUser();
  const socket = useSocket();

  useEffect(() => {
    if (user.avatar === undefined || user.avatar === "") setDefaultAvatar();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const uploadAvatar = async () => {
    if (user.studentId)
      await UserUtils.uploadAvatar(
        socket.socket,
        user.studentId.toString(),
        user.setAvatar
      );
    setAnchorEl(null);
  };

  const setDefaultAvatar = async () => {
    if (user.studentId)
      await UserUtils.setDefaultAvatar(
        socket.socket,
        user.studentId.toString(),
        user.setAvatar
      );
    setAnchorEl(null);
  };

  return (
    <Stack
      direction="row"
      spacing={5}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
        marginBottom: "20px",
        color: "text.primary",
      }}
    >
      <Typography variant="h5">Avatar</Typography>
      <Avatar
        id="basic-button"
        src={user.avatar}
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
      ></Avatar>
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
    </Stack>
  );
}
