import { AlertProps, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { notificationBuilder, useNotifications } from "..";

const AlertWithRef = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
  }
);

export default function Notification(props: {
  type: "ERROR" | "INFO" | "WARNING" | "SUCCESS";
}) {
  const notifications = useNotifications();
  const { setMessage, message, severity } = notificationBuilder(
    notifications,
    props.type
  );

  return (
    <Snackbar
      open={message !== ""}
      autoHideDuration={2500}
      onClose={() => setMessage("")}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <AlertWithRef onClose={() => setMessage("")} severity={severity}>
        {message}
      </AlertWithRef>
    </Snackbar>
  );
}
