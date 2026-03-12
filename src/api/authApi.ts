import api from "./axios";
import { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";

export const loginRequest = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/Auth/login", data);
  return response.data;
};

export const registerRequest = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/Auth/register", data);
  return response.data;
};