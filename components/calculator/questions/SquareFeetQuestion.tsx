/**
 * SquareFeetQuestion Component
 * 
 * Question for entering exact square footage with input field.
 */

import { Input } from "../../ui/Input";
import { colors, typography } from "../../../lib/design-system";

interface SquareFeetQuestionProps {
  value?: number;
  onChange: (value: number) => void;
}

export function SquareFeetQuestion({ value, onChange }: SquareFeetQuestionProps) {
  return (
    <div className="max-w-md">
      <Input
        type="number"
        label="Enter your garage's square footage"
        placeholder="e.g., 400"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        min={100}
        max={5000}
        style={{ fontSize: typography.fontSize.lg }}
      />
      <p className="mt-3 text-sm" style={{ color: colors.text.secondary }}>
        Typical sizes: 1-car (250 sq ft), 2-car (400 sq ft), 3-car (600 sq ft)
      </p>
    </div>
  );
}
