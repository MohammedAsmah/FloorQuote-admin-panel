/**
 * GarageSizeQuestion Component
 * 
 * Question for selecting garage size with premium option cards.
 */

import { OptionCard } from "../../ui/OptionCard";
import { Car, Home, Warehouse, Maximize } from "lucide-react";
import { colors } from "../../../lib/design-system";
import type { GarageSize } from "../../../types/calculator";

interface GarageSizeQuestionProps {
  value?: GarageSize;
  onChange: (value: GarageSize) => void;
}

const options = [
  {
    value: "one_car" as GarageSize,
    label: "1-Car Garage",
    description: "Approximately 200-300 sq ft",
    icon: <Car size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "two_car" as GarageSize,
    label: "2-Car Garage",
    description: "Approximately 350-500 sq ft",
    icon: <Home size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "three_car" as GarageSize,
    label: "3-Car Garage",
    description: "Approximately 550-700 sq ft",
    icon: <Warehouse size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "oversized" as GarageSize,
    label: "Oversized / Custom",
    description: "More than 700 sq ft or custom layout",
    icon: <Maximize size={24} style={{ color: colors.accent.blue }} />,
  },
];

export function GarageSizeQuestion({ value, onChange }: GarageSizeQuestionProps) {
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
