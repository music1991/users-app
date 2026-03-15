import { useState } from 'react';
import { UserProfile, UserRole } from '../types/user';
import { userService } from '../api/userApi';
import { toast } from 'react-toastify';

type UpdateProfileField = <K extends keyof UserProfile>(
  key: K,
  value: UserProfile[K]
) => void;

export const useUserUpdate = (
  userId: number | undefined,
  updateProfileField?: UpdateProfileField
) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const handleOpenEmailModal = () => setIsEmailModalOpen(true);
  const handleCloseEmailModal = () => setIsEmailModalOpen(false);

  const handleOpenRoleModal = () => setIsRoleModalOpen(true);
  const handleCloseRoleModal = () => setIsRoleModalOpen(false);

  const handleUpdateEmail = async (newEmail: string) => {
    if (!userId) return;
    setIsUpdating(true);

    try {
      await userService.updateEmail(userId, newEmail);

      updateProfileField?.("email", newEmail);
      toast.success("Correo actualizado")
      handleCloseEmailModal();
    } catch (err: any) {
      const errorMessage = err.response?.data || "Error inesperado";

      toast.error(`${errorMessage}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateRole = async (newRole: UserRole) => {
    if (!userId) return;
    setIsUpdating(true);

    try {
      await userService.updateRole(userId, newRole);

      updateProfileField?.("role", newRole);
      toast.success("Rol actualizado")
      handleCloseRoleModal();
    } catch (err: any) {
      toast.error("Error actualizar Role");
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    handleUpdateEmail,
    handleUpdateRole,
    isUpdating,
    isEmailModalOpen,
    isRoleModalOpen,
    handleOpenEmailModal,
    handleCloseEmailModal,
    handleOpenRoleModal,
    handleCloseRoleModal
  };
};