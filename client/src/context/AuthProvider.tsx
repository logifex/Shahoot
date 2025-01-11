import { PropsWithChildren, useEffect, useState } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";
import User from "../types/user";

const EXPIRY_TIME = 22 * 60 * 60 * 1000;

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState<{ token: string; user: User }>();

  useEffect(() => {
    const userJson = localStorage.getItem("user-data");
    if (!userJson) {
      return;
    }

    const {
      user: storedUser,
      token: storedToken,
      expiry,
    } = JSON.parse(userJson) as {
      user: User;
      token: string;
      expiry: string;
    };

    if (new Date() > new Date(expiry)) {
      localStorage.removeItem("user-data");
      return;
    }

    if (userJson) {
      setUserData({ token: storedToken, user: storedUser });
    }
  }, []);

  const signIn = (userData: { token: string; user: User }) => {
    setUserData(userData);

    localStorage.setItem(
      "user-data",
      JSON.stringify({
        ...userData,
        expiry: new Date(new Date().getTime() + EXPIRY_TIME).toISOString(),
      })
    );
  };

  const signOut = () => {
    setUserData(undefined);

    localStorage.removeItem("user-data");
  };

  const authContext: AuthContextType = {
    userData: userData,
    signIn: signIn,
    signOut: signOut,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
