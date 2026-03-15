import axios from "axios";
import { logoutRequest, refreshTokenRequest } from "./authApi";
import { purgeSession } from "../utils/session";

console.log("BASE_URL es:", process.env.REACT_APP_BASE_URL_USERS_MANAGEMENT_API);

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_USERS_MANAGEMENT_API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes("/Auth/login")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error();

        const data = await refreshTokenRequest({ refreshToken });
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("refreshToken", data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutRequest().finally(() => purgeSession());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;