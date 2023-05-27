import { createContext, useState, FunctionComponent } from "react";
import useAuth from "../hooks/useAuth";

type AuthValue = {
  isLoggedIn: boolean | null;
  reCheck: () => void;
};

export const AuthContext = createContext<AuthValue>({
  isLoggedIn: null,
  reCheck() {},
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FunctionComponent<IAuthProviderProps> = (props) => {
  const { isLoggedIn, reCheck } = useAuth();
  return (
    <AuthContext.Provider value={{ isLoggedIn, reCheck }}>
      {props.children}
    </AuthContext.Provider>
  );
};
