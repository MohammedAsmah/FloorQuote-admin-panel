"use client";

"use client";

import { motion } from "framer-motion";
import { colors, borderRadius, shadows } from "@/lib/design-system";
import { cn } from "@/lib/utils/cn";

interface KpiCardProps {
  label: string;
  value: string | number;
  accent?: "blue" | "teal" | "purple" | "amber";
}

const accentStyles = {
  blue: "from-blue-500 to-sky-500",
  teal: "from-teal-500 to-cyan-500",
  purple: "from-violet-500 to-fuchsia-500",
  amber: "from-amber-500 to-orange-500",
};

export function KpiCard({ label, value, accent = "blue" }: KpiCardProps) {
  return (
    <motion.div
      className="group rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      style={{ borderRadius: borderRadius["2xl"], boxShadow: shadows.md }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{value}</p>
        </div>
        <div
          className={cn(
            "h-12 w-12 rounded-3xl bg-gradient-to-br text-white shadow-lg",
            accentStyles[accent]
          )}
          style={{ boxShadow: shadows.glowBlue }}
        />
      </div>
    </motion.div>
  );
}
