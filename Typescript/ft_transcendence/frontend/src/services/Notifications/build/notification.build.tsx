import { AlertColor } from "@mui/material";
import { NotificationsProps } from "../context/notifications.context";

export function notificationBuilder(
  notifications: NotificationsProps,
  type: "ERROR" | "INFO" | "WARNING" | "SUCCESS"
): {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  severity: AlertColor;
} {
  const setMessage =
    type === "ERROR"
      ? notifications.setErrorMessage
      : type === "INFO"
      ? notifications.setInfoMessage
      : type === "WARNING"
      ? notifications.setWarningMessage
      : notifications.setSuccessMessage;
  const message =
    type === "ERROR"
      ? notifications.errorMessage
      : type === "INFO"
      ? notifications.infoMessage
      : type === "WARNING"
      ? notifications.warningMessage
      : notifications.successMessage;
  const severity =
    type === "ERROR"
      ? "error"
      : type === "INFO"
      ? "info"
      : type === "WARNING"
      ? "warning"
      : "success";
  return { setMessage, message, severity };
}
