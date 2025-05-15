import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);

  return auth?.isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
