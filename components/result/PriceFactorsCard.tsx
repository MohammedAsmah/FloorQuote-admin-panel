/**
 * PriceFactorsCard Component
 * 
 * Explains how each user selection influenced the estimate.
 * Builds transparency and trust in the pricing.
 */

"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { colors } from "../../lib/design-system";
import type { CalculatorInput } from "../../types/calculator";

interface PriceFactorsCardProps {
  input: CalculatorInput;
}

const factorDescriptions: Record<keyof CalculatorInput, {
  label: string;
  impact: "increase" | "decrease" | "neutral";
  explanation: string;
}> = {
  garageSize: {
    label: "Garage Size",
    impact: "increase",
    explanation: "Larger garages require more materials and labor",
  },
  squareFeet: {
    label: "Square Footage",
    impact: "increase",
    explanation: "Cost scales directly with floor area",
  },
  coatingType: {
    label: "Coating Type",
    impact: "increase",
    explanation: "Premium materials have higher base costs",
  },
  floorCondition: {
    label: "Floor Condition",
    impact: "increase",
    explanation: "Poor condition requires additional preparation",
  },
  crackLevel: {
    label: "Crack Repairs",
    impact: "increase",
    explanation: "More cracks mean more repair work needed",
  },
  existingCoating: {
    label: "Existing Coating",
    impact: "increase",
    explanation: "Removal adds time and labor costs",
  },
  decorativeFinish: {
    label: "Decorative Finish",
    impact: "increase",
    explanation: "Premium finishes add material costs",
  },
  stemWalls: {
    label: "Stem Walls",
    impact: "increase",
    explanation: "Additional surface area to coat (+$250)",
  },
  stepsCount: {
    label: "Steps",
    impact: "increase",
    explanation: "Each step adds $100 to the estimate",
  },
  moistureIssues: {
    label: "Moisture Issues",
    impact: "increase",
    explanation: "Requires special treatment (+20% multiplier)",
  },
  timeline: {
    label: "Timeline",
    impact: "neutral",
    explanation: "Affects scheduling but not base pricing",
  },
  city: {
    label: "Location",
    impact: "neutral",
    explanation: "Calgary market pricing applied",
  },
};

export function PriceFactorsCard({ input }: PriceFactorsCardProps) {
  const factors = Object.entries(input).filter(([key]) => factorDescriptions[key as keyof CalculatorInput]);

  return (
    <Card elevated className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
      >
        <h3
          className="text-xl font-bold mb-6"
          style={{ color: colors.text.primary }}
        >
          Why Your Price Changed
        </h3>

        <div className="space-y-3">
          {factors.map(([key, value], index) => {
            const factor = factorDescriptions[key as keyof CalculatorInput];
            if (!factor) return null;

            const getIcon = () => {
              switch (factor.impact) {
                case "increase":
                  return <TrendingUp size={18} style={{ color: colors.status.warning }} />;
                case "decrease":
                  return <TrendingDown size={18} style={{ color: colors.status.success }} />;
                default:
                  return <Minus size={18} style={{ color: colors.text.secondary }} />;
              }
            };

            return (
              <motion.div
                key={key}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: colors.surface.hover }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.02, backgroundColor: colors.surface.active }}
              >
                <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                      {factor.label}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ 
                      backgroundColor: factor.impact === "increase" ? `${colors.status.warning}15` : 
                                     factor.impact === "decrease" ? `${colors.status.success}15` : 
                                     `${colors.text.secondary}10`,
                      color: factor.impact === "increase" ? colors.status.warning : 
                             factor.impact === "decrease" ? colors.status.success : 
                             colors.text.secondary,
                    }}>
                      {factor.impact === "increase" ? "Increases cost" : 
                       factor.impact === "decrease" ? "Reduces cost" : "Neutral"}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: colors.text.secondary }}>
                    {factor.explanation}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Card>
  );
}
