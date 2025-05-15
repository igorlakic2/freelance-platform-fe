import { createContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const isAuthenticated =
    localStorage.getItem("loggedIn") === "true" || loggedIn;
  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem("token")!
  );

  const login = (token: string) => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("token", token);
    setToken(token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    setToken(undefined);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
