/**
 * BreakdownCard Component
 * 
 * Visual breakdown of the estimate into components.
 * Shows percentages and estimated values for each cost category.
 */

"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { colors } from "../../lib/design-system";

interface BreakdownItem {
  label: string;
  percentage: number;
  value: number;
  color: string;
}

interface BreakdownCardProps {
  total: number;
}

export function BreakdownCard({ total }: BreakdownCardProps) {
  // Typical breakdown percentages for garage floor coating
  const breakdown: BreakdownItem[] = [
    {
      label: "Surface Preparation",
      percentage: 25,
      value: Math.round(total * 0.25),
      color: colors.accent.blue,
    },
    {
      label: "Materials",
      percentage: 35,
      value: Math.round(total * 0.35),
      color: colors.accent.teal,
    },
    {
      label: "Labor",
      percentage: 30,
      value: Math.round(total * 0.30),
      color: colors.status.success,
    },
    {
      label: "Repairs & Extras",
      percentage: 10,
      value: Math.round(total * 0.10),
      color: colors.status.warning,
    },
  ];

  return (
    <Card elevated className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
      >
        <h3
          className="text-xl font-bold mb-6"
          style={{ color: colors.text.primary }}
        >
          Cost Breakdown
        </h3>

        {/* Visual Breakdown */}
        <div className="space-y-4 mb-6">
          {breakdown.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium" style={{ color: colors.text.primary }}>
                  {item.label}
                </span>
                <span className="text-sm" style={{ color: colors.text.secondary }}>
                  {item.percentage}% (${item.value.toLocaleString()})
                </span>
              </div>
              <div
                className="h-2.5 rounded-full overflow-hidden"
                style={{ backgroundColor: colors.border.inactive }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    background: item.color,
                    boxShadow: `0 0 10px ${item.color}40`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <p className="text-xs" style={{ color: colors.text.muted }}>
          * Breakdown is approximate. Actual percentages may vary based on project specifics.
        </p>
      </motion.div>
    </Card>
  );
}
