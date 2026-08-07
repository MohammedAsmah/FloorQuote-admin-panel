/**
 * OptionCard Component
 * 
 * Premium selectable card component for radio-like selections.
 * Features animated check icon, enhanced hover effects, and smooth selected states.
 */

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils/cn";
import { colors, borderRadius, shadows } from "../../lib/design-system";

interface OptionCardProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function OptionCard({ children, selected = false, onClick, icon, className }: OptionCardProps) {
  return (
    <motion.div
      className={cn(
        "relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300",
        selected
          ? "border-blue-500"
          : "border-gray-200 bg-white",
        className
      )}
      style={{
        borderColor: selected ? colors.accent.blue : colors.border.default,
        backgroundColor: selected ? colors.surface.selected : colors.background.card,
        borderRadius: borderRadius.xl,
        boxShadow: selected ? shadows.glowBlue : shadows.sm,
      }}
      onClick={onClick}
      whileHover={!selected ? { 
        y: -4, 
        borderColor: colors.border.hover,
        boxShadow: shadows.lg,
        transition: { duration: 0.3, ease: "easeOut" } 
      } : undefined}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
    >
      <div className="flex items-start gap-4">
        {icon && (
          <motion.div
            className="flex-shrink-0 p-3 rounded-xl"
            style={{
              backgroundColor: selected ? `${colors.accent.blue}15` : `${colors.text.primary}05`,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}
        <div className="flex-1">{children}</div>
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className="flex-shrink-0"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ 
                  background: colors.gradients.blue,
                  boxShadow: shadows.glowBlue,
                }}
              >
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
