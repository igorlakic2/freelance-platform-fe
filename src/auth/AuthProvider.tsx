import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token?: string;
  authData: AuthDataType | undefined;
}

type AuthDataType = {
  email: string;
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [authData, setAuthData] = useState<AuthDataType | undefined>();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decoded = jwtDecode<AuthDataType>(newToken);
    setAuthData(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(undefined);
    setAuthData(undefined);
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    if (!token) return;

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwtDecode<AuthDataType>(storedToken);
      setAuthData(decoded);
    }

    const getTokenExpiration = (jwt: string): number | null => {
      try {
        const payload = JSON.parse(atob(jwt.split(".")[1]));
        return payload.exp ? payload.exp * 1000 : null;
      } catch {
        return null;
      }
    };

    const expiration = getTokenExpiration(token);
    if (!expiration) return;

    const now = Date.now();
    const timeout = expiration - now;

    if (timeout <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeout);

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, authData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
