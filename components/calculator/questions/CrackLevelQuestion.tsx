/**
 * CrackLevelQuestion Component
 * 
 * Question for assessing crack severity in the concrete.
 */

import { OptionCard } from "../../ui/OptionCard";
import { CheckCircle, Minus, XCircle, AlertOctagon } from "lucide-react";
import { colors } from "../../../lib/design-system";
import type { CrackLevel } from "../../../types/calculator";

interface CrackLevelQuestionProps {
  value?: CrackLevel;
  onChange: (value: CrackLevel) => void;
}

const options = [
  {
    value: "none" as CrackLevel,
    label: "No Cracks",
    description: "Smooth, crack-free surface",
    icon: <CheckCircle size={24} style={{ color: colors.status.success }} />,
  },
  {
    value: "minor" as CrackLevel,
    label: "Minor Cracks",
    description: "A few hairline cracks",
    icon: <Minus size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "several" as CrackLevel,
    label: "Several Cracks",
    description: "Multiple visible cracks",
    icon: <XCircle size={24} style={{ color: colors.status.warning }} />,
  },
  {
    value: "major" as CrackLevel,
    label: "Major Cracks",
    description: "Large or structural cracks",
    icon: <AlertOctagon size={24} style={{ color: colors.status.error }} />,
  },
];

export function CrackLevelQuestion({ value, onChange }: CrackLevelQuestionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
