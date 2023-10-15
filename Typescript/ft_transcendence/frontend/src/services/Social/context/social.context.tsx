import React, { useState } from "react";
import { User } from "../../User";
import { GameListItem } from "../../Game/context/game.context";
import { achievements } from "../../User/context/user.context";

export interface FriendProfile extends User {
  isFriend: boolean;
  isBlocked: boolean;
  games: GameListItem[];
  achievements: achievements
}

export type CurrentFriendProfile = FriendProfile | undefined;

export interface SocialProps {
  friendProfile: CurrentFriendProfile;
  setFriendProfile: React.Dispatch<React.SetStateAction<CurrentFriendProfile>>;
  friendRequests: User[];
  setFriendRequests: React.Dispatch<React.SetStateAction<User[]>>;
  friends: User[];
  setFriends: React.Dispatch<React.SetStateAction<User[]>>;
  blockedUsers: User[];
  setBlockedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const SocialContext = React.createContext<SocialProps | undefined>(
  undefined
);

export function SocialProvider({ children }: any) {
  const [friendProfile, setFriendProfile] =
    useState<CurrentFriendProfile>(undefined);
  const [friendRequests, setFriendRequests] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);

  return (
    <SocialContext.Provider
      value={{
        friendProfile,
        setFriendProfile,
        friendRequests,
        setFriendRequests,
        friends,
        setFriends,
        blockedUsers,
        setBlockedUsers,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const context = React.useContext(SocialContext);
  if (context === undefined) {
    throw new Error("useSocial must be used within a SocialProvider");
  }
  return context;
}
