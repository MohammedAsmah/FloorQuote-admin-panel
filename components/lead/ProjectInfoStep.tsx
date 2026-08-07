/**
 * ProjectInfoStep Component
 * 
 * Step 2 of lead capture: Project Information
 * Displays calculator selections (read-only) with option to edit.
 * Shows coating type, timeline, and key project details.
 */

"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Wrench, Thermometer, Snowflake, Edit2 } from "lucide-react";
import { colors } from "../../lib/design-system";
import { COATING_TYPE_LABELS } from "../../types/calculator";
import type { LeadCalculatorContext } from "../../lib/validations/lead";

interface ProjectInfoStepProps {
  calculatorData: LeadCalculatorContext;
  onNext: () => void;
  onEditCalculator?: () => void;
}

const COATING_ICONS: Record<string, React.ReactNode> = {
  epoxy: <Shield size={32} style={{ color: colors.accent.blue }} />,
  polyaspartic: <Thermometer size={32} style={{ color: colors.accent.blue }} />,
  polyurea: <Wrench size={32} style={{ color: colors.accent.blue }} />,
  metallic: <Snowflake size={32} style={{ color: colors.accent.teal }} />,
  quartz: <Clock size={32} style={{ color: colors.accent.teal }} />,
  not_sure: <Shield size={32} style={{ color: colors.text.secondary }} />,
};

export function ProjectInfoStep({ calculatorData, onNext, onEditCalculator }: ProjectInfoStepProps) {
  const formatTimeline = (timeline: string) => {
    const timelineMap: Record<string, string> = {
      asap: "As soon as possible",
      within_month: "Within 1 month",
      within_three_months: "Within 3 months",
      flexible: "Flexible timeline",
    };
    return timelineMap[timeline] || timeline;
  };

  const formatCondition = (condition: string) => {
    const conditionMap: Record<string, string> = {
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      poor: "Poor",
    };
    return conditionMap[condition] || condition;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2
          className="text-2xl md:text-3xl font-bold mb-2"
          style={{ color: colors.text.primary }}
        >
          Project Information
        </h2>
        <p style={{ color: colors.text.secondary }}>
          Review your calculator selections. These will be shared with contractors.
        </p>
      </div>

      <div className="space-y-6">
        {/* Coating Type */}
        <motion.div
          className="p-6 rounded-2xl border-2"
          style={{
            borderColor: colors.border.default,
            backgroundColor: colors.surface.selected,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 p-3 rounded-xl"
              style={{ backgroundColor: `${colors.accent.blue}10` }}
            >
              {COATING_ICONS[calculatorData.coatingType] || COATING_ICONS.epoxy}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3
                  className="font-semibold"
                  style={{ color: colors.text.primary }}
                >
                  Selected Coating
                </h3>
                {onEditCalculator && (
                  <button
                    type="button"
                    onClick={onEditCalculator}
                    className="flex items-center gap-1 text-sm"
                    style={{ color: colors.accent.blue }}
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                )}
              </div>
              <p className="text-lg font-medium" style={{ color: colors.text.primary }}>
                {COATING_TYPE_LABELS[calculatorData.coatingType as keyof typeof COATING_TYPE_LABELS] || calculatorData.coatingType}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.surface.hover }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="text-sm mb-1" style={{ color: colors.text.secondary }}>
              Square Footage
            </div>
            <div className="text-lg font-semibold" style={{ color: colors.text.primary }}>
              {calculatorData.squareFeet.toLocaleString()} sq ft
            </div>
          </motion.div>

          <motion.div
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.surface.hover }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-sm mb-1" style={{ color: colors.text.secondary }}>
              Floor Condition
            </div>
            <div className="text-lg font-semibold" style={{ color: colors.text.primary }}>
              {formatCondition(calculatorData.floorCondition)}
            </div>
          </motion.div>

          <motion.div
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.surface.hover }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="text-sm mb-1" style={{ color: colors.text.secondary }}>
              Timeline
            </div>
            <div className="text-lg font-semibold" style={{ color: colors.text.primary }}>
              {formatTimeline(calculatorData.timeline)}
            </div>
          </motion.div>

          <motion.div
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.surface.hover }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-sm mb-1" style={{ color: colors.text.secondary }}>
              Estimated Range
            </div>
            <div className="text-lg font-semibold" style={{ color: colors.accent.blue }}>
              ${calculatorData.estimatedLow.toLocaleString()} - ${calculatorData.estimatedHigh.toLocaleString()}
            </div>
          </motion.div>
        </div>

        {/* Additional Features */}
        <motion.div
          className="p-4 rounded-xl"
          style={{ backgroundColor: colors.surface.hover }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="text-sm mb-2" style={{ color: colors.text.secondary }}>
            Additional Features
          </div>
          <div className="flex flex-wrap gap-2">
            {calculatorData.stemWalls && (
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.accent.blue}10`,
                  color: colors.accent.blue,
                }}
              >
                Stem Walls
              </span>
            )}
            {calculatorData.stepsCount > 0 && (
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.accent.blue}10`,
                  color: colors.accent.blue,
                }}
              >
                {calculatorData.stepsCount} Steps
              </span>
            )}
            {calculatorData.moistureIssues && (
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.status.warning}10`,
                  color: colors.status.warning,
                }}
              >
                Moisture Issues
              </span>
            )}
            {calculatorData.decorativeFinish !== "none" && (
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.accent.teal}10`,
                  color: colors.accent.teal,
                }}
              >
                {calculatorData.decorativeFinish === "standard_flakes" ? "Standard Flakes" : "Premium Flakes"}
              </span>
            )}
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          className="text-sm"
          style={{ color: colors.text.muted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Contractors will use this information to provide accurate quotes. You can edit these details if needed.
        </motion.p>
      </div>
    </motion.div>
  );
}
