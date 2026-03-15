import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../types/user";
import { LogOut } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

function Navbar() {
  const { user, logout } = useAuth();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      toast.error("Error al cerrar sesión");
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Usuarios App</h1>
          <p className="text-sm text-gray-500">
            {user?.email} - {user?.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
        
               {user?.role === UserRole.Admin && (
                <>
          <Link
            to="/profile"
            className="px-4 py-2 rounded-xl text-black hover:bg-gray-200 transition"
          >
            Perfil
          </Link>

   
            <Link
              to="/users"
              className="px-4 py-2 rounded-xl text-black hover:bg-gray-200 transition"
            >
              Usuarios
            </Link>
            </>
          )}

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            title="Cerrar sesión"
            className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm flex items-center justify-center"
          >
            <LogOut size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Cerrar Sesión"
        message="¿Estás seguro de que deseas salir de la aplicación?"
        confirmText="Aceptar"
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </nav>
  );
}

export default Navbar;