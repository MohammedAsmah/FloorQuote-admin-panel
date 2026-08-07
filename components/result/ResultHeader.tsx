/**
 * ResultHeader Component
 * 
 * Top section of the results page with success message, animated estimate, and Hero CTA.
 * Creates immediate visual impact with enhanced animations and gradient effects.
 */

"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { colors, typography, shadows } from "../../lib/design-system";
import { AnimatedNumber } from "./AnimatedNumber";
import { Button } from "../ui/Button";

interface ResultHeaderProps {
  estimatedLow: number;
  estimatedHigh: number;
  onGetQuotes: () => void;
}

export function ResultHeader({ estimatedLow, estimatedHigh, onGetQuotes }: ResultHeaderProps) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Success Icon with glow */}
      <motion.div
        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 relative"
        style={{ 
          background: colors.gradients.success,
          boxShadow: shadows.glowTeal,
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        <CheckCircle size={40} style={{ color: colors.text.inverse }} />
        <motion.div
          className="absolute -top-2 -right-2"
          initial={{ scale: 0, rotate: 90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <Sparkles size={20} style={{ color: colors.status.success }} />
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: colors.text.primary, fontSize: typography.fontSize["4xl"] }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Your Garage Floor Estimate
      </motion.h1>

      {/* Animated Price Range with gradient text */}
      <div className="mb-4">
        <motion.div
          className="text-5xl md:text-7xl font-bold"
          style={{
            background: colors.gradients.teal,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: typography.fontSize["5xl"],
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <AnimatedNumber value={estimatedLow} prefix="$" suffix=" CAD" /> –{" "}
          <AnimatedNumber value={estimatedHigh} prefix="$" suffix=" CAD" />
        </motion.div>
      </div>

      {/* Subtitle */}
      <motion.p
        className="text-lg mb-6"
        style={{ color: colors.text.secondary }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        Estimated range for your garage floor coating project
      </motion.p>

      {/* Hero CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        <Button
          variant="gradient"
          size="lg"
          onClick={onGetQuotes}
          className="px-8"
        >
          Get Exact Quotes
          <ArrowRight size={20} className="ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
