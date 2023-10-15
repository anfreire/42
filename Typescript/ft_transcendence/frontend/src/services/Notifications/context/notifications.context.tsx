import React, { useState } from "react";

export interface NotificationsProps {
  successMessage: string;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  warningMessage: string;
  setWarningMessage: React.Dispatch<React.SetStateAction<string>>;
  infoMessage: string;
  setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const NotificationsContext = React.createContext<
  NotificationsProps | undefined
>(undefined);

export function NotificationsProvider({ children }: any) {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<string>("");

  return (
    <NotificationsContext.Provider
      value={{
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        warningMessage,
        setWarningMessage,
        infoMessage,
        setInfoMessage,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = React.useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
}
