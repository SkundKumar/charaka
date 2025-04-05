// context/UserContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserType = {
    name: string;
    age: string;
    contact: string;
    privateKey: string;
    walletAddress: string;
    medicalInfo: {
      allergies: string[];
      bloodGroup: string;
      chronicConditions: string[];
    };
  };
  
type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
