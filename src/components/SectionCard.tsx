import { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
};

function SectionCard({ children }: SectionCardProps) {
  return <div className="mt-6 border rounded-xl p-4">{children}</div>;
}

export default SectionCard;