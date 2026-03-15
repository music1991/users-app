import { Study } from "../types/study";
import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";
import StudyItemCard from "./StudyItemCard";

type StudiesSectionProps = {
  studies: Study[];
  subtitle: string;
  onAdd?: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  readOnly?: boolean;
};

function StudiesSection({
  studies,
  subtitle,
  onAdd,
  onEdit,
  onDelete,
  readOnly = false,
}: StudiesSectionProps) {
  return (
    <SectionCard>
      <SectionHeader
        title="Estudios"
        subtitle={subtitle}
        onAction={onAdd}
        isEdit={false}
      />

      {studies.length > 0 ? (
        <div className="space-y-4">
          {studies.map((study) => (
            <StudyItemCard
              key={study.id}
              study={study}
              onEdit={onEdit}
              onDelete={onDelete}
              readOnly={readOnly}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic py-4">
            No hay estudios registrados.
          </p>
      )}
    </SectionCard>
  );
}

export default StudiesSection;