import api from "./axios";
import { User, MyProfileResponse, UpdateEmailRequest, UpdateRoleRequest, UserRole } from "../types/user";

export const getMyProfile = async (): Promise<MyProfileResponse> => {
  const response = await api.get<MyProfileResponse>("/Users/me");
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/Users");
  return response.data;
};

export const getUserById = async (id: number): Promise<MyProfileResponse> => {
  const response = await api.get<MyProfileResponse>(`/Users/${id}`);
  return response.data;
};

export async function deleteUser(id: number) {
  await api.delete(`/Users/${id}`);
}

export const userService = {
  updateEmail: async (userId: number, email: string): Promise<void> => {
    const data: UpdateEmailRequest = { email };
    await api.put(`/users/${userId}/email`, data);
  },

  updateRole: async (userId: number, newRole: UserRole): Promise<void> => {
    const data: UpdateRoleRequest = { newRole };
    await api.put(`/users/${userId}/role`, data);
  }
};