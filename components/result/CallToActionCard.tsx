/**
 * CallToActionCard Component
 * 
 * Primary conversion section with clear CTAs and trust elements.
 * Drives users to take the next step with confidence.
 */

"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ArrowRight, RotateCcw, CheckCircle, Shield, Clock, MapPin } from "lucide-react";
import { colors } from "../../lib/design-system";

interface CallToActionCardProps {
  onGetQuotes: () => void;
  onRestart: () => void;
}

const trustElements = [
  {
    icon: <CheckCircle size={18} style={{ color: colors.status.success }} />,
    text: "No obligation",
  },
  {
    icon: <Shield size={18} style={{ color: colors.status.success }} />,
    text: "Free estimates",
  },
  {
    icon: <MapPin size={18} style={{ color: colors.status.success }} />,
    text: "Local Calgary contractors",
  },
  {
    icon: <Clock size={18} style={{ color: colors.status.success }} />,
    text: "Response within 24 hours",
  },
];

export function CallToActionCard({ onGetQuotes, onRestart }: CallToActionCardProps) {
  return (
    <Card elevated className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
      >
        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: colors.text.primary }}
          >
            Ready for Exact Quotes?
          </h3>
          <p
            className="text-base mb-6"
            style={{ color: colors.text.secondary }}
          >
            Get matched with top-rated Calgary contractors for your project
          </p>
          <Button
            variant="gradient"
            size="lg"
            onClick={onGetQuotes}
            className="w-full md:w-auto px-8"
          >
            Get Exact Quotes
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </motion.div>

        {/* Trust Elements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {trustElements.map((element, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2 p-3 rounded-lg"
              style={{ backgroundColor: colors.surface.hover }}
              whileHover={{ scale: 1.05, backgroundColor: colors.surface.active }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 1.0 + index * 0.1 }}
            >
              {element.icon}
              <span className="text-xs font-medium text-center" style={{ color: colors.text.secondary }}>
                {element.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="my-6 h-px"
          style={{ backgroundColor: colors.border.default }}
        />

        {/* Secondary CTA */}
        <div className="text-center">
          <Button
            variant="secondary"
            onClick={onRestart}
            className="w-full md:w-auto"
          >
            <RotateCcw size={18} className="mr-2" />
            Start New Estimate
          </Button>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-6 p-4 rounded-lg text-left"
          style={{ backgroundColor: colors.surface.hover }}
        >
          <p className="text-xs leading-relaxed" style={{ color: colors.text.secondary }}>
            <strong style={{ color: colors.text.primary }}>Disclaimer:</strong> This estimate is based on Calgary market pricing and the information you provided. An on-site inspection is required for an exact quote. Final pricing may vary based on actual site conditions, material availability, and contractor pricing.
          </p>
        </div>
      </motion.div>
    </Card>
  );
}
