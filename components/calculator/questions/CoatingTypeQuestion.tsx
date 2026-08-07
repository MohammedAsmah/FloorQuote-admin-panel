/**
 * CoatingTypeQuestion Component
 * 
 * Question for selecting coating type with detailed option cards.
 * This is a critical question that affects pricing significantly.
 */

import { OptionCard } from "../../ui/OptionCard";
import { Shield, Zap, Droplets, Sparkles, Layers, HelpCircle } from "lucide-react";
import { colors } from "../../../lib/design-system";
import type { CoatingType } from "../../../types/calculator";

interface CoatingTypeQuestionProps {
  value?: CoatingType;
  onChange: (value: CoatingType) => void;
}

const options = [
  {
    value: "epoxy" as CoatingType,
    label: "Epoxy",
    description: "Classic, durable, budget-friendly option",
    details: "Great for most residential garages",
    priceRange: "$3-8 per sq ft",
    icon: <Shield size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "polyaspartic" as CoatingType,
    label: "Polyaspartic",
    description: "Fast-curing, UV-resistant, premium choice",
    details: "Best for moisture resistance and quick installation",
    priceRange: "$6-10 per sq ft",
    icon: <Zap size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "polyurea" as CoatingType,
    label: "Polyurea",
    description: "Industrial-grade, maximum durability",
    details: "Ideal for heavy-use and commercial applications",
    priceRange: "$8-12 per sq ft",
    icon: <Droplets size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "metallic" as CoatingType,
    label: "Metallic",
    description: "Stunning 3D metallic finish",
    details: "Premium aesthetic with unique depth and shine",
    priceRange: "$8-12 per sq ft",
    icon: <Sparkles size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "quartz" as CoatingType,
    label: "Quartz",
    description: "Textured, slip-resistant finish",
    details: "Excellent for high-traffic areas",
    priceRange: "$7-11 per sq ft",
    icon: <Layers size={24} style={{ color: colors.accent.blue }} />,
  },
  {
    value: "not_sure" as CoatingType,
    label: "Not Sure Yet",
    description: "I'd like a recommendation",
    details: "We'll suggest the best option for your needs",
    priceRange: "Varies",
    icon: <HelpCircle size={24} style={{ color: colors.text.secondary }} />,
  },
];

export function CoatingTypeQuestion({ value, onChange }: CoatingTypeQuestionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((option) => (
        <OptionCard
          key={option.value}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
          icon={option.icon}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
              {option.label}
            </h3>
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{
                backgroundColor: `${colors.accent.blue}10`,
                color: colors.accent.blue,
              }}
            >
              {option.priceRange}
            </span>
          </div>
          <p className="text-sm mb-2" style={{ color: colors.text.secondary }}>
            {option.description}
          </p>
          <p className="text-xs" style={{ color: colors.text.muted }}>
            {option.details}
          </p>
        </OptionCard>
      ))}
    </div>
  );
}
