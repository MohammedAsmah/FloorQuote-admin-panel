"use client";

/**
 * Card Component
 * 
 * Premium card component with enhanced shadows, glassmorphism, and elegant borders.
 * Used for content containers and option selections.
 */

import { motion } from "framer-motion";
import { cn } from "../../lib/utils/cn";
import { colors, borderRadius, shadows } from "../../lib/design-system";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: () => void;
  elevated?: boolean;
  glassmorphism?: boolean;
}

export function Card({ 
  children, 
  className, 
  hover = false, 
  selected = false, 
  onClick,
  elevated = false,
  glassmorphism = false
}: CardProps) {
  const cardShadow = elevated ? shadows.xl : shadows.md;
  const bgColor = glassmorphism ? colors.background.glass : colors.background.card;

  return (
    <motion.div
      className={cn(
        "rounded-2xl border transition-all duration-300",
        selected
          ? "border-blue-500"
          : "border-gray-200",
        hover && !onClick && "hover:shadow-xl",
        onClick && "cursor-pointer",
        className
      )}
      style={{
        borderColor: selected ? colors.accent.blue : colors.border.default,
        backgroundColor: selected ? colors.surface.selected : bgColor,
        borderRadius: borderRadius.xl,
        boxShadow: selected ? shadows.glowBlue : cardShadow,
        backdropFilter: glassmorphism ? "blur(12px)" : "none",
        WebkitBackdropFilter: glassmorphism ? "blur(12px)" : "none",
      }}
      whileHover={onClick ? { 
        y: -4, 
        boxShadow: shadows.xl,
        transition: { duration: 0.3, ease: "easeOut" } 
      } : hover ? {
        boxShadow: shadows.lg,
        transition: { duration: 0.3 }
      } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
