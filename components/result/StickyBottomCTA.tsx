/**
 * StickyBottomCTA Component
 * 
 * Floating sticky bottom action bar with glassmorphism effect.
 * Appears after estimate is revealed and provides persistent CTA access.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { colors, borderRadius, shadows } from "../../lib/design-system";
import { AnimatedNumber } from "./AnimatedNumber";
import { useEffect, useState } from "react";

interface StickyBottomCTAProps {
  estimatedLow: number;
  estimatedHigh: number;
  onGetQuotes: () => void;
  visible: boolean;
  nearFooter?: boolean;
}

export function StickyBottomCTA({ 
  estimatedLow, 
  estimatedHigh, 
  onGetQuotes, 
  visible,
  nearFooter = false 
}: StickyBottomCTAProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && !nearFooter && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            className="mx-auto max-w-4xl px-6 pb-6 pt-4"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderTopLeftRadius: borderRadius.xl,
              borderTopRightRadius: borderRadius.xl,
              boxShadow: shadows.xl,
              borderBottom: "none",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Price Display */}
              <div className="flex items-center gap-3">
                <div
                  className="text-sm font-medium"
                  style={{ color: colors.text.secondary }}
                >
                  Your Estimate:
                </div>
                <div
                  className="text-xl font-bold"
                  style={{ color: colors.accent.teal }}
                >
                  <AnimatedNumber value={estimatedLow} prefix="$" /> –{" "}
                  <AnimatedNumber value={estimatedHigh} prefix="$" />
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={onGetQuotes}
                  className="w-full sm:w-auto px-8"
                >
                  Get Exact Quotes
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
