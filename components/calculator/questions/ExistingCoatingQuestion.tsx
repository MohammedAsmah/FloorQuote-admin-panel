/**
 * ExistingCoatingQuestion Component
 * 
 * Question for checking if there's an existing coating to remove.
 */

import { OptionCard } from "../../ui/OptionCard";
import { X, PaintRoller, Layers } from "lucide-react";
import { colors } from "../../../lib/design-system";
import type { ExistingCoating } from "../../../types/calculator";

interface ExistingCoatingQuestionProps {
  value?: ExistingCoating;
  onChange: (value: ExistingCoating) => void;
}

const options = [
  {
    value: "none" as ExistingCoating,
    label: "No Existing Coating",
    description: "Bare concrete or old coating removed",
    icon: <X size={24} style={{ color: colors.status.success }} />,
  },
  {
    value: "paint" as ExistingCoating,
    label: "Paint",
    description: "Latex or oil-based paint",
    icon: <PaintRoller size={24} style={{ color: colors.status.warning }} />,
  },
  {
    value: "epoxy" as ExistingCoating,
    label: "Epoxy Coating",
    description: "Previous epoxy coating",
    icon: <Layers size={24} style={{ color: colors.status.error }} />,
  },
];

export function ExistingCoatingQuestion({ value, onChange }: ExistingCoatingQuestionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {options.map((option) => (
        <OptionCard
          key={option.value}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
          icon={option.icon}
        >
          <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text.primary }}>
            {option.label}
          </h3>
          <p className="text-sm" style={{ color: colors.text.secondary }}>
            {option.description}
          </p>
        </OptionCard>
      ))}
    </div>
  );
}
