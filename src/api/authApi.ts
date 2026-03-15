import api from "./axios";
import { LoginRequest, RegisterRequest, AuthResponse, UpdatePasswordRequest, MessageResponse, RefreshTokenRequest } from "../types/auth";

export const loginRequest = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/Auth/login", data);
  return response.data;
};

export const logoutRequest = async (): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>("/Auth/logout");
  return response.data;
};

export const registerRequest = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/Auth/register", data);
  return response.data;
};

export const updatePasswordRequest = async (
  data: UpdatePasswordRequest
): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>("/Auth/update-password", data);
  return response.data;
};

export const refreshTokenRequest = async (
  data: RefreshTokenRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/Auth/refresh-token", data);
  return response.data;
};