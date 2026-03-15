import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from 'react-toastify';
import { useAuth } from "../context/AuthContext";
import { refreshTokenRequest } from "../api/authApi";

const WARNING_THRESHOLD = Number(process.env.REACT_APP_SESSION_WARNING_THRESHOLD) || 5000;

export function useSessionTimeout() {
  const { user, login, logout } = useAuth();
  
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(user.token);
      const expirationTime = (decoded.exp || 0) * 1000;
      const timeLeft = expirationTime - Date.now();

      const warningTime = timeLeft - WARNING_THRESHOLD;

      const warningTimer = setTimeout(() => {
        setShowWarning(true);
      }, Math.max(warningTime, 0));

      const logoutTimer = setTimeout(() => {
        handleManualLogout();
      }, Math.max(timeLeft, 0));

      return () => {
        clearTimeout(warningTimer);
        clearTimeout(logoutTimer);
      };
    } catch (error) {
      handleManualLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]);

  const handleContinueSession = async () => {
    if (!user?.refreshToken) return;
    try {
      setIsRefreshing(true);
      const data = await refreshTokenRequest({ refreshToken: user.refreshToken });
      
      login(data);
      setShowWarning(false);
    } catch (error) {
      toast.error("Tu sesión expiro");
      handleManualLogout();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleManualLogout = () => {
    setShowWarning(false);
    logout();
  };

  return {
    showWarning,
    isRefreshing,
    handleContinueSession,
    handleManualLogout
  };
}