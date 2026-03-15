import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordUpdateSchema } from "../utils/validationSchemas";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { currentPassword?: string; newPassword: string }) => Promise<void>;
  isLoading: boolean;
  isAdmin: boolean;
  isOwnProfile: boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isLoading,
  isAdmin,
  isOwnProfile,
}) => {
  const needsCurrent = isOwnProfile || !isAdmin;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordUpdateSchema),
    context: { needsCurrent },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    await onSave({
      currentPassword: needsCurrent ? data.currentPassword : undefined,
      newPassword: data.newPassword,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Actualizar Contraseña</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {needsCurrent && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contraseña Actual
              </label>
              <input
                {...register("currentPassword")}
                type="password"
                maxLength={10}
                className={`w-full px-4 py-2 border rounded-xl outline-none transition-all focus:ring-2 ${
                  errors.currentPassword ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:ring-blue-100"
                }`}
                placeholder="•••••••"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.currentPassword.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nueva Contraseña
            </label>
            <input
              {...register("newPassword")}
              type="password"
              maxLength={10}
              className={`w-full px-4 py-2 border rounded-xl outline-none transition-all focus:ring-2 ${
                errors.newPassword ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:ring-blue-100"
              }`}
              placeholder="•••••••"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirmar Nueva Contraseña
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              maxLength={10}
              className={`w-full px-4 py-2 border rounded-xl outline-none transition-all focus:ring-2 ${
                errors.confirmPassword ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:ring-blue-100"
              }`}
              placeholder="•••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Guardando</span>
                </>
              ) : (
                "Actualizar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;