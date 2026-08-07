/**
 * ReviewStep Component
 * 
 * Step 4 of lead capture: Review
 * Displays a summary of all information collected.
 * Allows editing of any section before submission.
 */

"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MessageSquare, Home, Clock, Edit2, DollarSign } from "lucide-react";
import { colors } from "../../lib/design-system";
import { COATING_TYPE_LABELS } from "../../types/calculator";
import type { ContactInfoFormData } from "../../lib/validations/lead";
import type { AdditionalInfoFormData } from "../../lib/validations/lead";
import type { LeadCalculatorContext } from "../../lib/validations/lead";

interface ReviewStepProps {
  contactInfo: ContactInfoFormData;
  additionalInfo: AdditionalInfoFormData;
  calculatorData: LeadCalculatorContext;
  onNext: () => void;
  onEditContact: () => void;
  onEditProject: () => void;
  onEditAdditional: () => void;
}

const PROPERTY_LABELS: Record<string, string> = {
  detached: "Detached Home",
  semi_detached: "Semi-Detached",
  townhouse: "Townhouse",
  commercial: "Commercial",
};

const CONTACT_METHOD_LABELS: Record<string, string> = {
  email: "Email",
  phone: "Phone Call",
  text: "Text Message",
};

const CONTACT_TIME_LABELS: Record<string, string> = {
  morning: "Morning (8am - 12pm)",
  afternoon: "Afternoon (12pm - 5pm)",
  evening: "Evening (5pm - 8pm)",
  any: "Any Time",
};

export function ReviewStep({
  contactInfo,
  additionalInfo,
  calculatorData,
  onNext,
  onEditContact,
  onEditProject,
  onEditAdditional,
}: ReviewStepProps) {
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
          Review Your Information
        </h2>
        <p style={{ color: colors.text.secondary }}>
          Please review all details before submitting. You can edit any section.
        </p>
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <motion.div
          className="p-6 rounded-2xl border-2"
          style={{
            borderColor: colors.border.default,
            backgroundColor: colors.background.card,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.text.primary }}
            >
              Contact Information
            </h3>
            <button
              type="button"
              onClick={onEditContact}
              className="flex items-center gap-1 text-sm"
              style={{ color: colors.accent.blue }}
            >
              <Edit2 size={16} />
              Edit
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User size={18} style={{ color: colors.text.muted }} />
              <span style={{ color: colors.text.primary }}>{contactInfo.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} style={{ color: colors.text.muted }} />
              <span style={{ color: colors.text.primary }}>{contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} style={{ color: colors.text.muted }} />
              <span style={{ color: colors.text.primary }}>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare size={18} style={{ color: colors.text.muted }} />
              <span style={{ color: colors.text.primary }}>
                {CONTACT_METHOD_LABELS[contactInfo.preferredContactMethod]}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Project Information */}
        <motion.div
          className="p-6 rounded-2xl border-2"
          style={{
            borderColor: colors.border.default,
            backgroundColor: colors.background.card,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.text.primary }}
            >
              Project Information
            </h3>
            <button
              type="button"
              onClick={onEditProject}
              className="flex items-center gap-1 text-sm"
              style={{ color: colors.accent.blue }}
            >
              <Edit2 size={16} />
              Edit
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: colors.text.muted }}>
                Coating:
              </span>
              <span style={{ color: colors.text.primary }}>
                {COATING_TYPE_LABELS[calculatorData.coatingType as keyof typeof COATING_TYPE_LABELS] || calculatorData.coatingType}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: colors.text.muted }}>
                Size:
              </span>
              <span style={{ color: colors.text.primary }}>
                {calculatorData.squareFeet.toLocaleString()} sq ft
              </span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign size={18} style={{ color: colors.text.muted }} />
              <span style={{ color: colors.text.primary }}>
                ${calculatorData.estimatedLow.toLocaleString()} - ${calculatorData.estimatedHigh.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="p-6 rounded-2xl border-2"
          style={{
            borderColor: colors.border.default,
            backgroundColor: colors.background.card,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.text.primary }}
            >
              Additional Information
            </h3>
            <button
              type="button"
              onClick={onEditAdditional}
              className="flex items-center gap-1 text-sm"
              style={{ color: colors.accent.blue }}
            >
              <Edit2 size={16} />
              Edit
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Home size={18} style={{ color: colors.text.muted }} />
              <span style={{ color: colors.text.primary }}>
                {PROPERTY_LABELS[additionalInfo.propertyType]}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: colors.text.muted }}>
                Garage Empty:
              </span>
              <span style={{ color: colors.text.primary }}>
                {additionalInfo.garageEmpty ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={18} style={{ color: colors.text.muted }} />
              <span style={{ color: colors.text.primary }}>
                {CONTACT_TIME_LABELS[additionalInfo.preferredContactTime]}
              </span>
            </div>
            {additionalInfo.additionalNotes && (
              <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.hover }}>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  <strong style={{ color: colors.text.primary }}>Notes:</strong> {additionalInfo.additionalNotes}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="p-4 rounded-xl"
          style={{ backgroundColor: `${colors.status.info}10` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <p className="text-sm" style={{ color: colors.text.secondary }}>
            By submitting, you agree to be contacted by Calgary contractors regarding your garage floor coating project.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
