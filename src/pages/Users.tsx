
import { Loader2 } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import UsersTable from "../components/UsersTable";
import { useUsers } from "../hooks/useUsers";

function Users() {
  const {
    users,
    loading,
    error,
    isDeleteModalOpen,
    userToDelete,
    isDeleting,
    handleDeleteUser,
    handleCloseDeleteModal,
    handleConfirmDeleteUser,
  } = useUsers();

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Administracion de Usuarios
        </h2>
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <Loader2 className="w-10 h-10 text-blue-100 animate-none" />
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin absolute top-0 left-0" />
            </div>
            <p className="text-sm font-medium text-gray-500 animate-pulse">
              Cargando usuarios...
            </p>
          </div>
        )}

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </p>
        )}

        {!loading && !error && <UsersTable users={users} onDelete={handleDeleteUser} />}
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Eliminacion"
        message={
          userToDelete
            ? `Esta seguro que quiere eliminar el usuario "${userToDelete.email}"?`
            : "Esta seguro que quiere eliminar este usuario?"
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteUser}
        isLoading={isDeleting}
      />
    </>

  );
}

export default Users;