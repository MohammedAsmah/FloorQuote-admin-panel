/**
 * TimelineQuestion Component
 * 
 * Question for selecting project timeline.
 */

import { OptionCard } from "../../ui/OptionCard";
import { Zap, Clock, Calendar, Coffee } from "lucide-react";
import { colors } from "../../../lib/design-system";
import type { Timeline } from "../../../types/calculator";

interface TimelineQuestionProps {
  value?: Timeline;
  onChange: (value: Timeline) => void;
}

const options = [
  {
    value: "asap" as Timeline,
    label: "ASAP",
    description: "Within 1-2 weeks",
    icon: <Zap size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "within_month" as Timeline,
    label: "Within a Month",
    description: "Flexible within 30 days",
    icon: <Clock size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "within_three_months" as Timeline,
    label: "Within 3 Months",
    description: "Planning ahead",
    icon: <Calendar size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "flexible" as Timeline,
    label: "Flexible",
    description: "No specific timeline",
    icon: <Coffee size={24} style={{ color: colors.text.secondary }} />,
  },
];

export function TimelineQuestion({ value, onChange }: TimelineQuestionProps) {
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
