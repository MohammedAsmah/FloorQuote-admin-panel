/**
 * SubmitStep Component
 * 
 * Step 5 of lead capture: Submit
 * Shows submission state with loading animation.
 * Handles the actual submission to the database.
 */

"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { colors } from "../../lib/design-system";

interface SubmitStepProps {
  isSubmitting: boolean;
  error?: string;
}

export function SubmitStep({ isSubmitting, error }: SubmitStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12"
    >
      {isSubmitting ? (
        <>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Loader2
              size={64}
              className="animate-spin"
              style={{ color: colors.accent.blue }}
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold mb-2"
            style={{ color: colors.text.primary }}
          >
            Submitting Your Request
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: colors.text.secondary }}
          >
            Please wait while we connect you with Calgary contractors...
          </motion.p>
        </>
      ) : error ? (
        <>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${colors.status.error}15` }}
          >
            <span className="text-3xl" style={{ color: colors.status.error }}>
              ⚠️
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold mb-2"
            style={{ color: colors.text.primary }}
          >
            Submission Failed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-md"
            style={{ color: colors.text.secondary }}
          >
            {error || "Something went wrong. Please try again."}
          </motion.p>
        </>
      ) : (
        <>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${colors.status.success}15` }}
          >
            <span className="text-3xl">✓</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold mb-2"
            style={{ color: colors.text.primary }}
          >
            Ready to Submit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-md"
            style={{ color: colors.text.secondary }}
          >
            Click the button below to submit your request and get connected with Calgary contractors.
          </motion.p>
        </>
      )}
    </motion.div>
  );
}
