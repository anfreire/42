import { Circle } from "@mui/icons-material";
import { UserStatus } from "../../User";

interface StatusCircleIconProps {
  state: UserStatus;
}

export default function StatusCircleIcon(props: StatusCircleIconProps) {
  return (
    <Circle
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      color={
        props.state === "ONLINE"
          ? "success"
          : props.state === "IN_GAME"
          ? "warning"
          : "error"
      }
    />
  );
}
