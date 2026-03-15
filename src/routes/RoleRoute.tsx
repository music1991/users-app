import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleRouteProps {
  children: ReactElement;
  allowedRole: string;
}

function RoleRoute({
  children,
  allowedRole,
}: RoleRouteProps): ReactElement | null {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default RoleRoute;