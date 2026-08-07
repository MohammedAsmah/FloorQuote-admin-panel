/**
 * MoistureIssuesQuestion Component
 * 
 * Question for checking if there are moisture issues.
 */

import { OptionCard } from "../../ui/OptionCard";
import { Droplets, Check } from "lucide-react";
import { colors } from "../../../lib/design-system";

interface MoistureIssuesQuestionProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const options = [
  {
    value: true,
    label: "Yes, moisture issues",
    description: "Dampness, water seepage, or high humidity",
    icon: <Droplets size={24} style={{ color: colors.status.warning }} />,
  },
  {
    value: false,
    label: "No moisture issues",
    description: "Dry, no water problems",
    icon: <Check size={24} style={{ color: colors.status.success }} />,
  },
];

export function MoistureIssuesQuestion({ value, onChange }: MoistureIssuesQuestionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      {options.map((option) => (
        <OptionCard
          key={String(option.value)}
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
