import React, { useState } from "react";
import { UserStatus } from "..";
import { Color } from "../../../common/Theme";

export interface achievements {
  winFirstGame: boolean;
  winThreeTimes: boolean;
  winAgainstFriend: boolean;
  winAgainstBotEasy: boolean;
  winAgainstBotMedium: boolean;
  winAgainstBotHard: boolean;
  firstInLeaderboard: boolean;
  inviteGameInChat: boolean;
  inviteGameInChannel: boolean;
}

export interface UserProps {
  socket: string | undefined;
  setSocket: React.Dispatch<React.SetStateAction<string | undefined>>;
  twoFA: "NONE" | "GOOGLE" | "PHONE" | undefined;
  setTwoFA: React.Dispatch<
    React.SetStateAction<"NONE" | "GOOGLE" | "PHONE" | undefined>
  >;
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  avatar: string | undefined;
  setAvatar: React.Dispatch<React.SetStateAction<string | undefined>>;
  status: UserStatus | undefined;
  setStatus: React.Dispatch<React.SetStateAction<UserStatus | undefined>>;
  studentId: string | undefined;
  setStudentId: React.Dispatch<React.SetStateAction<string | undefined>>;
  gmail: string | undefined;
  setGmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  phone: string | undefined;
  setPhone: React.Dispatch<React.SetStateAction<string | undefined>>;
  achievements: achievements | undefined;
  setAchievements: React.Dispatch<
    React.SetStateAction<achievements | undefined>
  >;
  color: Color | undefined;
  setColor: React.Dispatch<React.SetStateAction<Color | undefined>>;
}

export const UserContext = React.createContext<UserProps | undefined>(
  undefined
);

export function UserProvider({ children }: any) {
  const [socket, setSocket] = useState<string | undefined>(undefined);
  const [twoFA, setTwoFA] = useState<"NONE" | "GOOGLE" | "PHONE" | undefined>(
    undefined
  );
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<UserStatus | undefined>(undefined);
  const [studentId, setStudentId] = useState<string | undefined>(undefined);
  const [gmail, setGmail] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<Color | undefined>(undefined);
  const [achievements, setAchievements] = useState<achievements | undefined>(
    undefined
  );

  return (
    <UserContext.Provider
      value={{
        socket,
        setSocket,
        twoFA,
        setTwoFA,
        username,
        setUsername,
        avatar,
        setAvatar,
        status,
        setStatus,
        studentId,
        setStudentId,
        gmail,
        setGmail,
        phone,
        setPhone,
        achievements,
        setAchievements,
        color,
        setColor,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserProps {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
