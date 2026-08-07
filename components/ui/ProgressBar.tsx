/**
 * ProgressBar Component
 * 
 * Sticky progress bar showing current step in the calculator.
 * Features enhanced glassmorphism, smooth animations, and step counter.
 */

import { motion } from "framer-motion";
import { colors, borderRadius, shadows } from "../../lib/design-system";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div 
      className="sticky top-0 z-50 border-b"
      style={{
        background: colors.background.glass,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderColor: colors.border.subtle,
        boxShadow: shadows.sm,
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <motion.span
            className="text-sm font-medium"
            style={{ color: colors.text.secondary }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={current}
          >
            Question {current} of {total}
          </motion.span>
          <motion.span
            className="text-sm font-semibold"
            style={{ color: colors.accent.blue }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            key={`percent-${current}`}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
        <div
          className="h-2.5 rounded-full overflow-hidden"
          style={{ backgroundColor: colors.progress.inactive, borderRadius: borderRadius.lg }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: colors.gradients.blue,
              borderRadius: borderRadius.lg,
              boxShadow: shadows.glowBlue,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
