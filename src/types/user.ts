import { ResourceOwner } from "./auth";
import { Address } from "./address";
import { Study } from "./study";

export enum UserRole {
  User = "User",
  Admin = "Admin"
}

export interface UserBase {
  id: number;
  email: string;
  role: string;
}

export interface User extends UserBase {}

export interface UserProfile extends UserBase {
  role: UserRole;
  addresses: Address[];
  studies: Study[];
}

export interface MyProfileResponse extends UserProfile {}

export interface UpdateEmailRequest {
  email: string;
}

export interface UpdateRoleRequest {
  newRole: UserRole;
}

export interface UseAddressOptions {
  owner: ResourceOwner;
}
