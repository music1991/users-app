import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Address, CreateAddressRequest } from "../types/address";
import { addressSchema } from "../utils/validationSchemas";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateAddressRequest) => Promise<void>;
  addressToEdit?: Address | null;
  userId?: number | null;
}

function AddressModal({
  userId,
  isOpen,
  onClose,
  onSave,
  addressToEdit,
}: AddressModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAddressRequest>({
    resolver: yupResolver(addressSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        addressToEdit
          ? {
              street: addressToEdit.street,
              city: addressToEdit.city,
              country: addressToEdit.country,
            }
          : {
              street: "",
              city: "",
              country: "",
            }
      );
    }
  }, [addressToEdit, isOpen, reset]);

  const onSubmit = async (data: CreateAddressRequest) => {
    const payload: CreateAddressRequest = {
      ...data,
      userId: userId || undefined,
    };
    await onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {addressToEdit ? "Editar Dirección" : "Agregar Dirección"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calle / Número
            </label>
            <input
              {...register("street")}
              maxLength={20}
              className={`w-full rounded-xl border ${
                errors.street ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nombre de la Calle / Número"
            />
            {errors.street && (
              <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad
            </label>
            <input
              {...register("city")}
              maxLength={20}
              className={`w-full rounded-xl border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nombre de la Ciudad"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              País
            </label>
            <input
              {...register("country")}
              maxLength={20}
              className={`w-full rounded-xl border ${
                errors.country ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nombre del País"
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting
                ? "Guardando..."
                : addressToEdit
                ? "Actualizar"
                : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressModal;
