import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthUser {
  email: string;
  role: string;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (data: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");

    if (token && email && role) {
      setUser({ token, email, role });
    }
  }, []);

  const login = (data: AuthUser) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("role", data.role);

    setUser(data);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};