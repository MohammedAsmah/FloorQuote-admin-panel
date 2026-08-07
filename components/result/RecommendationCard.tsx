/**
 * RecommendationCard Component
 * 
 * Displays the recommended coating system with detailed benefits.
 * Helps users understand why this recommendation fits their project with enhanced design.
 */

"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Shield, Clock, Wrench, Thermometer, Snowflake } from "lucide-react";
import { colors, shadows } from "../../lib/design-system";
import type { CoatingType } from "../../types/calculator";

interface RecommendationCardProps {
  recommendedSystem: string;
  coatingType?: CoatingType;
}

const coatingDetails: Record<CoatingType, {
  icon: React.ReactNode;
  benefits: string[];
  lifespan: string;
  installationTime: string;
  maintenance: string;
  weather: string;
  gradient: string;
}> = {
  epoxy: {
    icon: <Shield size={32} style={{ color: colors.accent.blue }} />,
    benefits: [
      "Excellent chemical resistance",
      "High durability for daily use",
      "Cost-effective option",
      "Wide color selection",
    ],
    lifespan: "10-15 years",
    installationTime: "2-3 days",
    maintenance: "Low - simple cleaning",
    weather: "Good for Calgary's temperature swings",
    gradient: colors.gradients.blue,
  },
  polyaspartic: {
    icon: <Thermometer size={32} style={{ color: colors.accent.blue }} />,
    benefits: [
      "Superior UV resistance",
      "Fast curing (walkable in hours)",
      "Excellent moisture resistance",
      "Flexible with temperature changes",
    ],
    lifespan: "15-20 years",
    installationTime: "1-2 days",
    maintenance: "Very low",
    weather: "Ideal for Calgary's extreme cold",
    gradient: colors.gradients.teal,
  },
  polyurea: {
    icon: <Wrench size={32} style={{ color: colors.accent.blue }} />,
    benefits: [
      "Maximum durability",
      "Industrial-grade strength",
      "Excellent impact resistance",
      "Flexible substrate protection",
    ],
    lifespan: "20+ years",
    installationTime: "2-3 days",
    maintenance: "Very low",
    weather: "Best for harsh Calgary winters",
    gradient: colors.gradients.purple,
  },
  metallic: {
    icon: <Snowflake size={32} style={{ color: colors.accent.teal }} />,
    benefits: [
      "Stunning 3D metallic effect",
      "Unique depth and shine",
      "Premium aesthetic appeal",
      "Easy to clean",
    ],
    lifespan: "12-15 years",
    installationTime: "2-3 days",
    maintenance: "Low - avoid harsh chemicals",
    weather: "Good for indoor garages",
    gradient: colors.gradients.primary,
  },
  quartz: {
    icon: <Clock size={32} style={{ color: colors.accent.teal }} />,
    benefits: [
      "Excellent slip resistance",
      "Textured for safety",
      "High durability",
      "Great for high-traffic areas",
    ],
    lifespan: "15-20 years",
    installationTime: "2-3 days",
    maintenance: "Low",
    weather: "Excellent for all Calgary conditions",
    gradient: colors.gradients.success,
  },
  not_sure: {
    icon: <Shield size={32} style={{ color: colors.text.secondary }} />,
    benefits: [
      "Balanced performance",
      "Good value for money",
      "Suitable for most applications",
      "Contractor can recommend based on site visit",
    ],
    lifespan: "10-15 years",
    installationTime: "2-3 days",
    maintenance: "Low",
    weather: "Suitable for Calgary climate",
    gradient: colors.gradients.blue,
  },
};

export function RecommendationCard({ recommendedSystem, coatingType = "epoxy" }: RecommendationCardProps) {
  const details = coatingDetails[coatingType] || coatingDetails.epoxy;

  return (
    <Card elevated className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div
            className="flex-shrink-0 p-3 rounded-xl"
            style={{ 
              background: details.gradient,
              boxShadow: shadows.glowBlue,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {details.icon}
          </motion.div>
          <div className="flex-1">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: colors.text.primary }}
            >
              Recommended System
            </h3>
            <p className="text-base" style={{ color: colors.text.secondary }}>
              {recommendedSystem}
            </p>
          </div>
        </div>

        {/* Key Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Lifespan", value: details.lifespan },
            { label: "Installation", value: details.installationTime },
            { label: "Maintenance", value: details.maintenance },
            { label: "Calgary Weather", value: details.weather },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="p-3 rounded-lg"
              style={{ backgroundColor: colors.surface.hover }}
              whileHover={{ scale: 1.05, backgroundColor: colors.surface.active }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.6 + index * 0.05 }}
            >
              <div className="text-xs mb-1" style={{ color: colors.text.secondary }}>
                {item.label}
              </div>
              <div className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits List */}
        <div>
          <h4
            className="text-sm font-semibold mb-3"
            style={{ color: colors.text.primary }}
          >
            Key Benefits
          </h4>
          <ul className="space-y-2">
            {details.benefits.map((benefit, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2 text-sm"
                style={{ color: colors.text.secondary }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ 
                    background: details.gradient,
                    boxShadow: shadows.glowBlue,
                  }}
                />
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </Card>
  );
}
