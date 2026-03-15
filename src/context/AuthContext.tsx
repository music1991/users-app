import { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "../types/user";
import { logoutRequest } from "../api/authApi";
import { purgeSession } from "../utils/session";
import { AuthContextType, AuthUser } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredUser = (): AuthUser | null => {
  const token = sessionStorage.getItem("token");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role") as UserRole;

  if (token && refreshToken && email && role) {
    return { token, refreshToken, email, role };
  }

  return null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);

  const login = (data: AuthUser) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("refreshToken", data.refreshToken);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("role", data.role);

    setUser(data);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Error en logoutRequest:", error);
    } finally {
      setUser(null);
      purgeSession();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe ser usado dentro de AuthProvider");
  return context;
};