import { createContext } from "react";
import User from "../types/user";

export type AuthContextType = {
  userData?: { token: string; user: User };
  signIn: (userData: { token: string; user: User }) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userData: undefined,
  signIn: () => {},
  signOut: () => {},
});

export default AuthContext;
