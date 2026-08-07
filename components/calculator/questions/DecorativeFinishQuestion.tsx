/**
 * DecorativeFinishQuestion Component
 * 
 * Question for selecting decorative finish options.
 */

import { OptionCard } from "../../ui/OptionCard";
import { X, Sparkles, Star } from "lucide-react";
import { colors } from "../../../lib/design-system";
import type { DecorativeFinish } from "../../../types/calculator";

interface DecorativeFinishQuestionProps {
  value?: DecorativeFinish;
  onChange: (value: DecorativeFinish) => void;
}

const options = [
  {
    value: "none" as DecorativeFinish,
    label: "Solid Color",
    description: "Clean, solid color finish",
    icon: <X size={24} style={{ color: colors.text.secondary }} />,
  },
  {
    value: "standard_flakes" as DecorativeFinish,
    label: "Standard Flakes",
    description: "Classic flake texture",
    icon: <Sparkles size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "premium_flakes" as DecorativeFinish,
    label: "Premium Flakes",
    description: "Larger, premium flakes",
    icon: <Star size={24} style={{ color: colors.accent.teal }} />,
  },
];

export function DecorativeFinishQuestion({ value, onChange }: DecorativeFinishQuestionProps) {
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
