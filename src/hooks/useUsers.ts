import { useCallback, useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userApi";
import { User } from "../types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar Usuarios");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); 

  const userToDelete = users.find((u) => u.id === userIdToDelete) || null;

  const handleDeleteUser = (id: number) => {
    setError("");
    setUserIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setUserIdToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteUser = async () => {
    if (!userIdToDelete) return;

    try {
      setIsDeleting(true);
      setError("");
      await deleteUser(userIdToDelete);

      handleCloseDeleteModal();
      await fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al borrar Usuario");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    isDeleteModalOpen,
    userToDelete,
    isDeleting,
    handleDeleteUser,
    handleCloseDeleteModal,
    handleConfirmDeleteUser,
  };
}
