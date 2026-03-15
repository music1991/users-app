import { ReactNode } from "react";

interface UserSummaryCardProps {
  label: string;
  value?: string | number;
  button?: ReactNode;
}

function UserSummaryCard({ label, value, button }: UserSummaryCardProps) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-start min-w-0">
      <div className="space-y-1 flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium truncate" title={label}>
          {label}
        </p>
        {value && (
          <p 
            className="text-lg font-semibold text-gray-800 truncate" 
            title={value.toString()}
          >
            {value}
          </p>
        )}
        {button && (
          <div className="pt-1">
            {button}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSummaryCard;