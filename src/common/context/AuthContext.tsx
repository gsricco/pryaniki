import React, {createContext, useState, useContext} from 'react';
import {useLocalStorage} from "../hooks/useLocalStorage";
import {AuthContextProps, AuthProviderProps} from "./types";


const AuthContext = createContext<AuthContextProps | undefined>(undefined);



export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const {setItem, getItem, removeItem} = useLocalStorage()
  const [token, setToken] = useState<string | null>(getItem('token'));

  const login = (token: string) => {
    setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{token, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
