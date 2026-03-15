import { useEffect, useState, useCallback } from "react";
import { getMyProfile, getUserById } from "../api/userApi";
import { MyProfileResponse, UserProfile } from "../types/user";
import { OwnerType, UseProfileOptions } from "../types/auth";

export function useProfile({ owner }: UseProfileOptions) {
  const [profile, setProfile] = useState<MyProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const updateProfileField = <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K]
  ) => {
    setProfile(prev => prev ? { ...prev, [key]: value } : prev);
  };

  const ownerKey = owner.type === OwnerType.Me ? OwnerType.Me : owner.userId;

  const refreshProfile = useCallback(async () => {
    if (owner.type === OwnerType.User && !owner.userId) return;

    try {
      setLoading(true);
      setError("");

      const data =
        owner.type === OwnerType.Me
          ? await getMyProfile()
          : await getUserById(owner.userId);

      setProfile(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar el Perfil");
    } finally {
      setLoading(false);
    }
  }, [ownerKey]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  return {
    profile,
    loading,
    error,
    updateProfileField,
  };
}