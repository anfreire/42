import React, { useState } from "react";

interface dialogs {
  registerOpen: boolean;
  editOpen: boolean;
  authOpen: boolean;
  chatWithFriendOpen: boolean;
  connectChannelOpen: boolean;
  friendRequestOpen: boolean;
  profileOpen: boolean;
  channelProfileOpen: boolean;
  inviteGameOpen: boolean;
  gameResumeOpen: boolean;
  gameHistoryOpen: boolean;
  achievementsOpen: boolean;
}

interface buttons {
  auth42Disabled: boolean;
  sendSMSDisabled: boolean;
  checkSMSCodeOpen: boolean;
  authGoogleDisabled: boolean;
  twoFANoneChoiceDisabled: boolean;
  twoFAGoogleChoiceDisabled: boolean;
  twoFAPhoneChoiceDisabled: boolean;
}

interface collapse {
  authGoogleOpen: boolean;
  authPhoneOpen: boolean;
}

interface buttonGroups {
  twoFADisabled: boolean;
  twoFAChoice: "NONE" | "GOOGLE" | "PHONE";
}

interface drawers {
  rightOpen: boolean;
  leftOpen: boolean;
}

interface textFields {
  editUsernameDisabled: boolean;
}

export interface ComponentsProps {
  dialogs: dialogs;
  setDialogs: React.Dispatch<React.SetStateAction<dialogs>>;
  buttons: buttons;
  setButtons: React.Dispatch<React.SetStateAction<buttons>>;
  collapse: collapse;
  setCollapse: React.Dispatch<React.SetStateAction<collapse>>;
  buttonGroups: buttonGroups;
  setButtonGroups: React.Dispatch<React.SetStateAction<buttonGroups>>;
  drawers: drawers;
  setDrawers: React.Dispatch<React.SetStateAction<drawers>>;
  textFields: textFields;
  setTextFields: React.Dispatch<React.SetStateAction<textFields>>;
}

const ComponentsContext = React.createContext<ComponentsProps | undefined>(
  undefined
);

export function ComponentsProvider({ children }: any) {
  const [dialogs, setDialogs] = useState<dialogs>({
    registerOpen: false,
    editOpen: false,
    authOpen: true,
    chatWithFriendOpen: false,
    connectChannelOpen: false,
    friendRequestOpen: false,
    profileOpen: false,
    channelProfileOpen: false,
    inviteGameOpen: false,
    gameResumeOpen: false,
    gameHistoryOpen: false,
    achievementsOpen: false,
  });
  const [buttons, setButtons] = useState<buttons>({
    auth42Disabled: false,
    sendSMSDisabled: false,
    checkSMSCodeOpen: false,
    authGoogleDisabled: false,
    twoFANoneChoiceDisabled: false,
    twoFAGoogleChoiceDisabled: false,
    twoFAPhoneChoiceDisabled: false,
  });
  const [collapse, setCollapse] = useState<collapse>({
    authGoogleOpen: false,
    authPhoneOpen: false,
  });
  const [buttonGroups, setButtonGroups] = useState<buttonGroups>({
    twoFADisabled: false,
    twoFAChoice: "NONE",
  });
  const [drawers, setDrawers] = useState<drawers>({
    rightOpen: false,
    leftOpen: false,
  });
  const [textFields, setTextFields] = useState<textFields>({
    editUsernameDisabled: false,
  });

  return (
    <ComponentsContext.Provider
      value={{
        dialogs,
        setDialogs,
        buttons,
        setButtons,
        collapse,
        setCollapse,
        buttonGroups,
        setButtonGroups,
        drawers,
        setDrawers,
        textFields,
        setTextFields,
      }}
    >
      {children}
    </ComponentsContext.Provider>
  );
}

export function useComponents() {
  const context = React.useContext(ComponentsContext);
  if (!context) {
    throw new Error("useComponents must be used within a ComponentsProvider");
  }
  return context;
}
