import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateStudyRequest, Study } from "../types/study";
import { studySchema } from "../utils/validationSchemas";
import { formatToDate, formatToISO } from "../utils/date";

interface StudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateStudyRequest) => Promise<void>;
  studyToEdit?: Study | null;
  userId?: number | null;
}

function StudyModal({
  userId,
  isOpen,
  onClose,
  onSave,
  studyToEdit,
}: StudyModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateStudyRequest>({
    resolver: yupResolver(studySchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        studyToEdit
          ? {
              title: studyToEdit.title,
              institution: studyToEdit.institution,
              completionDate: formatToDate(studyToEdit.completionDate),
            }
          : {
              title: "",
              institution: "",
              completionDate: "",
            }
      );
    }
  }, [studyToEdit, isOpen, reset]);

  const onSubmit = async (data: CreateStudyRequest) => {
    const payload = {
      ...data,
      completionDate: formatToISO(data.completionDate),
      ...(userId ? { UserId: userId } : {}),
    };
    await onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {studyToEdit ? "Editar Estudio" : "Agregar Estudio"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl px-2"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 ml-1">
              Título
            </label>
            <input
              {...register("title")}
              maxLength={30}
              className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
                errors.title 
                  ? "border-red-500 focus:ring-red-100" 
                  : "border-gray-300 focus:ring-blue-100 focus:border-blue-500"
              }`}
              placeholder="Ej: Licenciatura en Sistemas"
            />
            {errors.title && (
              <p className="text-red-500 text-xs font-medium ml-1">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 ml-1">
              Institución
            </label>
            <input
              {...register("institution")}
              maxLength={30}
              className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
                errors.institution 
                  ? "border-red-500 focus:ring-red-100" 
                  : "border-gray-300 focus:ring-blue-100 focus:border-blue-500"
              }`}
              placeholder="Ej: Universidad Nacional"
            />
            {errors.institution && (
              <p className="text-red-500 text-xs font-medium ml-1">{errors.institution.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 ml-1">
              Fecha de finalizado
            </label>
            <input
              {...register("completionDate")}
              type="date"
              className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
                errors.completionDate 
                  ? "border-red-500 focus:ring-red-100" 
                  : "border-gray-300 focus:ring-blue-100 focus:border-blue-500"
              }`}
            />
            {errors.completionDate && (
              <p className="text-red-500 text-xs font-medium ml-1">{errors.completionDate.message}</p>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Guardando</span>
                </div>
              ) : (
                studyToEdit ? "Actualizar" : "Guardar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudyModal;
