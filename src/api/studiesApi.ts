import { OwnerType, ResourceOwner } from "../types/auth";
import { Study } from "../types/study";
import { CreateStudyRequest } from "../types/study";
import api from "./axios";

export async function getStudies(owner: ResourceOwner): Promise<Study[]> {
  try {
    if (owner.type === OwnerType.Me) {
      const { data } = await api.get("/Studies/me");
      return data;
    }

    const { data } = await api.get(`/Studies/user/${owner.userId}`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

export async function createStudy(payload: CreateStudyRequest) {
  const { data } = await api.post("/Studies", payload);
  return data;
}

export async function updateStudy(id: number, payload: CreateStudyRequest) {
  const { data } = await api.patch(`/Studies/${id}`, payload);
  return data;
}

export async function deleteStudy(id: number) {
  const { data } = await api.delete(`/Studies/${id}`);
  return data;
}