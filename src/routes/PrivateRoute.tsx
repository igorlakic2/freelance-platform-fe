import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import type { ReactNode } from "react";

type PrivateRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated, authData } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authData?.role!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
