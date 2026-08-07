/**
 * MarketComparisonCard Component
 * 
 * Displays Calgary market information for comparison.
 * Helps users understand their estimate in context.
 */

"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { TrendingUp, Calendar, Shield, DollarSign } from "lucide-react";
import { colors } from "../../lib/design-system";

interface MarketComparisonCardProps {
  userEstimate: number;
}

export function MarketComparisonCard({ userEstimate }: MarketComparisonCardProps) {
  // Calgary market data (typical ranges)
  const marketData = {
    typicalRange: "$2,500 - $8,000",
    averageCost: "$4,500",
    typicalDuration: "1-3 days",
    warranty: "5-10 years",
  };

  const isBelowAverage = userEstimate < 4500;
  const isAboveAverage = userEstimate > 4500;

  return (
    <Card elevated className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
      >
        <h3
          className="text-xl font-bold mb-6"
          style={{ color: colors.text.primary }}
        >
          Calgary Market Information
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { icon: <DollarSign size={18} style={{ color: colors.accent.blue }} />, label: "Typical Range", value: marketData.typicalRange },
            { icon: <TrendingUp size={18} style={{ color: colors.accent.blue }} />, label: "Average Cost", value: marketData.averageCost },
            { icon: <Calendar size={18} style={{ color: colors.accent.blue }} />, label: "Typical Duration", value: marketData.typicalDuration },
            { icon: <Shield size={18} style={{ color: colors.accent.blue }} />, label: "Warranty", value: marketData.warranty },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.surface.hover }}
              whileHover={{ scale: 1.05, backgroundColor: colors.surface.active }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.9 + index * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <span className="text-xs" style={{ color: colors.text.secondary }}>
                  {item.label}
                </span>
              </div>
              <div className="text-lg font-bold" style={{ color: colors.text.primary }}>
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Note */}
        <motion.div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: isBelowAverage ? `${colors.status.success}10` : 
                           isAboveAverage ? `${colors.status.warning}10` : 
                           `${colors.accent.blue}10`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        >
          <p className="text-sm" style={{ color: colors.text.secondary }}>
            {isBelowAverage 
              ? "Your estimate is below the Calgary average, which may indicate favorable conditions or efficient material choices."
              : isAboveAverage
              ? "Your estimate is above the Calgary average, likely due to premium materials, extensive repairs, or special features."
              : "Your estimate is in line with Calgary market averages for similar projects."
            }
          </p>
        </motion.div>
      </motion.div>
    </Card>
  );
}
