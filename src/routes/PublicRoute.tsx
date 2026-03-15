import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactElement } from "react";

interface PublicRouteProps {
  children: ReactElement;
}

function PublicRoute({ children }: PublicRouteProps) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default PublicRoute;
