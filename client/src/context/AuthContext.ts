import { createContext } from "react";
import User from "../types/user";

export type AuthContextType = {
  userData?: { token: string; user: User };
  ready: boolean;
  signIn: (userData: { token: string; user: User }) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userData: undefined,
  ready: false,
  signIn: () => {},
  signOut: () => {},
});

export default AuthContext;
