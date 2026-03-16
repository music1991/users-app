import { Pencil, Trash2 } from "lucide-react";
import { Study } from "../types/study";
import { formatToDate } from "../utils/date";

type StudyItemCardProps = {
  study: Study;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  readOnly?: boolean;
};

function StudyItemCard({
  study,
  onEdit,
  onDelete,
  readOnly = false,
}: StudyItemCardProps) {
  return (
    <div className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 min-w-0">
      <div className="min-w-0 flex-1">
        <p 
          className="text-lg font-semibold text-gray-800 truncate" 
          title={study.title}
        >
          {study.title}
        </p>
        <p 
          className="text-gray-600 truncate" 
          title={study.institution}
        >
          {study.institution}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Finalización: {formatToDate(study.completionDate)}
        </p>
      </div>

      {!readOnly && (
        <div className="flex flex-row md:flex-row gap-2 shrink-0 ml-auto md:ml-0">
          <button
            onClick={() => onEdit?.(study.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Pencil size={20} strokeWidth={2} />
          </button>
          <button
            onClick={() => onDelete?.(study.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default StudyItemCard;