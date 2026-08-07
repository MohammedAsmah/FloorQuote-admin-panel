/**
 * LeadSuccess Component
 * 
 * Success state after lead submission.
 * Shows reference number, expected response time, and next steps.
 * Provides option to calculate another garage.
 */

"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";
import { colors, shadows } from "../../lib/design-system";

interface LeadSuccessProps {
  referenceNumber: string;
  onCalculateAnother: () => void;
  onClose: () => void;
}

export function LeadSuccess({ referenceNumber, onCalculateAnother, onClose }: LeadSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-8 px-6"
    >
      {/* Success Icon */}
      <motion.div
        className="mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: colors.gradients.success,
            boxShadow: shadows.glowTeal,
          }}
        >
          <CheckCircle size={40} style={{ color: colors.text.inverse }} />
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-2xl md:text-3xl font-bold mb-3 text-center"
        style={{ color: colors.text.primary }}
      >
        Request Submitted Successfully!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-8 max-w-md"
        style={{ color: colors.text.secondary }}
      >
        Your information has been sent to Calgary contractors. They will review your project and reach out with exact quotes.
      </motion.p>

      {/* Reference Number Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm p-6 rounded-2xl border-2 mb-6"
        style={{
          borderColor: colors.border.default,
          backgroundColor: colors.surface.selected,
        }}
      >
        <div className="text-center">
          <p className="text-sm mb-2" style={{ color: colors.text.secondary }}>
            Your Reference Number
          </p>
          <p
            className="text-2xl font-bold tracking-wider"
            style={{ color: colors.accent.blue }}
          >
            {referenceNumber}
          </p>
        </div>
      </motion.div>

      {/* Expected Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-3 p-4 rounded-xl mb-8"
        style={{ backgroundColor: `${colors.status.info}10` }}
      >
        <Clock size={24} style={{ color: colors.status.info }} />
        <div>
          <p className="font-semibold" style={{ color: colors.text.primary }}>
            Expected Response Time
          </p>
          <p className="text-sm" style={{ color: colors.text.secondary }}>
            Within 24 hours
          </p>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-md mb-8"
      >
        <h3
          className="font-semibold mb-3 text-center"
          style={{ color: colors.text.primary }}
        >
          What Happens Next?
        </h3>
        <ul className="space-y-2 text-sm" style={{ color: colors.text.secondary }}>
          <li className="flex items-start gap-2">
            <span style={{ color: colors.status.success }}>✓</span>
            <span>Contractors review your project details</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: colors.status.success }}>✓</span>
            <span>You receive exact quotes via your preferred contact method</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: colors.status.success }}>✓</span>
            <span>Schedule site visits and get started on your project</span>
          </li>
        </ul>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
      >
        <Button
          variant="gradient"
          size="lg"
          onClick={onCalculateAnother}
          className="flex-1"
        >
          <RotateCcw size={20} className="mr-2" />
          Calculate Another Garage
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={onClose}
          className="flex-1"
        >
          Close
        </Button>
      </motion.div>
    </motion.div>
  );
}
