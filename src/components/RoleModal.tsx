import { useState, useEffect } from "react";
import { UserRole } from "../types/user";
import { ChevronDown } from "lucide-react";

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: UserRole) => Promise<void>;
  currentRole?: UserRole;
  isLoading: boolean;
}

function RoleModal({ isOpen, onClose, onSave, currentRole, isLoading }: RoleModalProps) {
  const [role, setRole] = useState<UserRole>(currentRole || UserRole.User);

  useEffect(() => {
    if (currentRole) setRole(currentRole);
  }, [currentRole, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Cambiar Rol de Usuario</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar Rol
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer pr-10 transition-all"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                disabled={isLoading}
              >
                <option value={UserRole.User}>Usuario Estándar</option>
                <option value={UserRole.Admin}>Administrador</option>
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <ChevronDown size={18} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleModal;