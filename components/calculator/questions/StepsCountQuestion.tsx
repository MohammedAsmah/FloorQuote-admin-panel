/**
 * StepsCountQuestion Component
 * 
 * Question for entering the number of steps to coat.
 */

import { Input } from "../../ui/Input";
import { colors, typography } from "../../../lib/design-system";

interface StepsCountQuestionProps {
  value?: number;
  onChange: (value: number) => void;
}

export function StepsCountQuestion({ value, onChange }: StepsCountQuestionProps) {
  return (
    <div className="max-w-md">
      <Input
        type="number"
        label="How many steps need coating?"
        placeholder="e.g., 2"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
        max={20}
        style={{ fontSize: typography.fontSize.lg }}
      />
      <p className="mt-3 text-sm" style={{ color: colors.text.secondary }}>
        Each step adds +$100 to the estimate
      </p>
    </div>
  );
}
