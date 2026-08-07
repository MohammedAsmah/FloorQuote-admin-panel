/**
 * StemWallsQuestion Component
 * 
 * Question for selecting if stem walls need coating.
 */

import { OptionCard } from "../../ui/OptionCard";
import { Layout, Minus } from "lucide-react";
import { colors } from "../../../lib/design-system";

interface StemWallsQuestionProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const options = [
  {
    value: true,
    label: "Yes, coat stem walls",
    description: "+$250 fixed cost",
    icon: <Layout size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: false,
    label: "No stem walls",
    description: "Floor only",
    icon: <Minus size={24} style={{ color: colors.text.secondary }} />,
  },
];

export function StemWallsQuestion({ value, onChange }: StemWallsQuestionProps) {
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
