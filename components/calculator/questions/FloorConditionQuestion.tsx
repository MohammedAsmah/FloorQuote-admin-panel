/**
 * FloorConditionQuestion Component
 * 
 * Question for assessing current floor condition.
 */

import { OptionCard } from "../../ui/OptionCard";
import { Smile, Meh, Frown, AlertTriangle } from "lucide-react";
import { colors } from "../../../lib/design-system";
import type { FloorCondition } from "../../../types/calculator";

interface FloorConditionQuestionProps {
  value?: FloorCondition;
  onChange: (value: FloorCondition) => void;
}

const options = [
  {
    value: "excellent" as FloorCondition,
    label: "Excellent",
    description: "Like new, no visible damage",
    icon: <Smile size={24} style={{ color: colors.status.success }} />,
  },
  {
    value: "good" as FloorCondition,
    label: "Good",
    description: "Minor wear, generally clean",
    icon: <Meh size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "fair" as FloorCondition,
    label: "Fair",
    description: "Visible wear, some stains",
    icon: <Frown size={24} style={{ color: colors.status.warning }} />,
  },
  {
    value: "poor" as FloorCondition,
    label: "Poor",
    description: "Heavy damage, extensive staining",
    icon: <AlertTriangle size={24} style={{ color: colors.status.error }} />,
  },
];

export function FloorConditionQuestion({ value, onChange }: FloorConditionQuestionProps) {
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
