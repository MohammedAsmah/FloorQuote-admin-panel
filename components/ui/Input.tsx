import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils/cn";
import { colors, borderRadius, shadows } from "../../lib/design-system";

interface InputProps extends Omit<HTMLMotionProps<"input">, "whileFocus"> {
  error?: boolean | string;
  label?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, icon, className, ...props }, ref) => {
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: colors.text.primary }}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: hasError ? colors.status.error : colors.text.muted }}
            >
              {icon}
            </div>
          )}
          <motion.input
            ref={ref}
            className={cn(
              "w-full py-3 rounded-xl border transition-all duration-200 focus:outline-none",
              icon ? "pl-12 pr-4" : "px-4",
              className
            )}
            style={{
              borderColor: hasError ? colors.status.error : colors.border.default,
              borderRadius: borderRadius.lg,
              fontSize: "1rem",
              backgroundColor: colors.background.card,
              color: colors.text.primary,
            }}
            whileFocus={{
              boxShadow: hasError ? "0 0 0 3px rgb(220 38 38 / 0.1)" : shadows.glow,
            }}
            {...props}
          />
        </div>
        {errorMessage && (
          <p className="mt-1.5 text-xs font-medium text-red-500" style={{ color: colors.status.error }}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

