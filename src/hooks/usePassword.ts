import { useState } from "react";
import { updatePasswordRequest } from "../api/authApi";
import { toast } from "react-toastify";

export const usePassword = (email: string, isAdmin: boolean) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (data: { currentPassword?: string; newPassword: string }) => {
    setLoading(true);
    try {
      await updatePasswordRequest({
        email,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      setIsModalOpen(false);
      toast.success("Contraseña actualizada")
    } catch (err: any) {
     toast.error("Error actualizar contraseña");
    } finally {
      setLoading(false);
    }
  };

  return {
    isPasswordModalOpen: isModalOpen,
    isUpdatingPassword: loading,
    handleOpenPasswordModal: () => setIsModalOpen(true),
    handleClosePasswordModal: () => setIsModalOpen(false),
    handleUpdatePassword
  };
};
