
import { Address, CreateAddressRequest, UpdateAddressRequest } from "../types/address";
import { OwnerType, ResourceOwner } from "../types/auth";
import api from "./axios";

export async function getAddress(owner: ResourceOwner): Promise<Address | null> {
  try {
    if (owner.type === OwnerType.Me) {
      const { data } = await api.get("/Address/me");
      return data;
    }

    const { data } = await api.get(`/Address/user/${owner.userId}`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}
export async function createAddress(payload: CreateAddressRequest) {
  const { data } = await api.post("/Address", payload);
  return data;
}

export async function updateAddress(id: number, payload: UpdateAddressRequest) {
  const { data } = await api.patch(`/Address/${id}`, payload);
  return data;
}

export async function deleteAddress(id: number) {
  const { data } = await api.delete(`/Address/${id}`);
  return data;
}