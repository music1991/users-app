import { Pencil, Plus } from "lucide-react";

type SectionHeaderProps = {
  isEdit: boolean;
  title: string;
  subtitle: string;
  onAction?: () => void;
};

function SectionHeader({
  isEdit,
  title,
  subtitle,
  onAction,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div>
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <button
        onClick={onAction}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition flex justify-end"
      >
        {isEdit ?
          <Pencil size={20} strokeWidth={2} /> : <Plus size={20} />}
      </button>
    </div>
  );
}

export default SectionHeader;