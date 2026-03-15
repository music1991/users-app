import UserSummaryCard from "./UserSummaryCard";
import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";
import { Trash2, Pencil } from "lucide-react";

type Address = {
  id: number;
  street: string;
  city: string;
  country: string;
};

type AddressSectionProps = {
  addresses: Address[];
  subtitle: string;
  onAdd: () => void;
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
};

function AddressSection({
  addresses,
  subtitle,
  onAdd,
  onEdit,
  onDelete,
}: AddressSectionProps) {
  return (
    <SectionCard>
      <SectionHeader
        title="Direcciones"
        subtitle={subtitle}
        onAction={onAdd}
        isEdit={false}
      />

      <div className="space-y-6 mt-4">
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <UserSummaryCard label="Calle" value={address.street} />
                <UserSummaryCard label="Ciudad" value={address.city} />
                <UserSummaryCard label="País" value={address.country} />

                <div className="flex gap-2 ml-auto md:mx-auto">
                  <button
                    onClick={() => onEdit(address)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(address.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>

          ))
        ) : (
          <p className="text-gray-500 italic py-4">
            No hay direcciones registradas.
          </p>
        )}
      </div>
    </SectionCard>
  );
}

export default AddressSection;