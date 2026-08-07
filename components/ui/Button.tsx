/**
 * Button Component
 * 
 * Premium button component with multiple variants and micro-interactions.
 * Supports primary, secondary, and ghost styles with enhanced hover/active states.
 */

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils/cn";
import { colors, borderRadius, shadows, transitions, typography } from "../../lib/design-system";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "whileHover" | "whileTap"> {
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: {
    backgroundColor: colors.accent.blue,
    color: "#FFFFFF",
    border: "none",
    boxShadow: shadows.md,
    hover: {
      backgroundColor: colors.accent.darkBlue,
      y: -2,
      boxShadow: shadows.lg,
    },
    active: {
      scale: 0.98,
      y: 0,
    },
  },
  secondary: {
    backgroundColor: colors.background.card,
    color: colors.text.primary,
    border: `1px solid ${colors.border.default}`,
    boxShadow: shadows.sm,
    hover: {
      backgroundColor: colors.surface.hover,
      borderColor: colors.border.hover,
      y: -1,
      boxShadow: shadows.md,
    },
    active: {
      scale: 0.98,
      y: 0,
    },
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.text.secondary,
    border: "none",
    boxShadow: "none",
    hover: {
      backgroundColor: colors.surface.hover,
      color: colors.text.primary,
    },
    active: {
      scale: 0.98,
    },
  },
  gradient: {
    backgroundColor: colors.gradients.blue,
    color: "#FFFFFF",
    border: "none",
    boxShadow: shadows.glowBlue,
    hover: {
      y: -2,
      boxShadow: shadows.glowBlue,
      scale: 1.02,
    },
    active: {
      scale: 0.98,
      y: 0,
    },
  },
};

const sizeStyles = {
  sm: {
    padding: "0.5rem 1rem",
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  md: {
    padding: "0.75rem 1.5rem",
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  lg: {
    padding: "1rem 2rem",
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading = false, children, className, disabled, ...props }, ref) => {
    const variantStyle = buttonVariants[variant];
    const sizeStyle = sizeStyles[size];
    const isGradient = variant === "gradient";

    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        style={{
          background: isGradient ? variantStyle.backgroundColor : variantStyle.backgroundColor,
          color: variantStyle.color,
          border: variantStyle.border,
          boxShadow: variantStyle.boxShadow,
          borderRadius: borderRadius.lg,
          padding: sizeStyle.padding,
          fontSize: sizeStyle.fontSize,
          fontWeight: sizeStyle.fontWeight,
        }}
        whileHover={!disabled && !isLoading ? variantStyle.hover : undefined}
        whileTap={!disabled && !isLoading ? variantStyle.active : undefined}
        transition={{ duration: 0.2, ease: "easeOut" }}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mr-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.span>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
