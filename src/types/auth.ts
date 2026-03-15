import { UserRole } from "./user";

export interface CredentialsBase {
  email: string;
  password: string;
}

export interface LoginRequest extends CredentialsBase {}

export interface RegisterRequest extends CredentialsBase {}

export interface AuthResponse {
  email: string;
  role: UserRole;
  refreshToken: string;
  token: string;
}

export interface UpdatePasswordRequest {
  email: string;
  currentPassword?: string;
  newPassword: string;
}

export interface MessageResponse {
  message: string;
}

export enum OwnerType {
  Me = 'me',
  User = 'user',
}

export type ResourceOwner =

  | { type: OwnerType.Me }
  | { type: OwnerType.User; userId: number };

export interface UseProfileOptions {
  owner: ResourceOwner;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthUser {
  email: string;
  role: UserRole;
  token: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (data: AuthUser) => void;
  logout: () => Promise<void>;
}