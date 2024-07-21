import {ReactNode} from "react";

export interface AuthContextProps {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}