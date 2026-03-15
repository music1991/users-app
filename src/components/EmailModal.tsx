import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateEmailSchema } from "../utils/validationSchemas";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (email: string) => Promise<void>;
  currentEmail: string;
  isLoading: boolean;
}

function EmailModal({ isOpen, onClose, onSave, currentEmail, isLoading }: EmailModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateEmailSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({ email: currentEmail });
    }
  }, [currentEmail, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: { email: string }) => {
    await onSave(data.email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Actualizar Correo</h3>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nuevo Correo Electrónico
            </label>
            <input
              {...register("email")}
              maxLength={15}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-xl outline-none transition-all focus:ring-2 ${
                errors.email 
                  ? "border-red-500 focus:ring-red-100" 
                  : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
              }`}
              placeholder="user@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              disabled={isLoading}
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
}

export default EmailModal;