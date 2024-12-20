"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IUser } from "@/types/user";

interface SessionContextProps {
  isAuth: boolean;
  user: IUser | null;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: IUser | null) => void;
  checkSession: () => Promise<void>;
  logout: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const checkSession = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Login First");
        return;
      }
      const res = await fetch(`${base_url}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setUser(result.user);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  const resetSession = () => {
    setIsAuth(false);
    setUser(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    resetSession();
    setIsAuth(false);
    setUser(null);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{ isAuth, user, setIsAuth, setUser, checkSession, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
