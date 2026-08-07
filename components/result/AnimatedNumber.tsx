/**
 * AnimatedNumber Component
 * 
 * Animates numbers counting up from 0 to the target value.
 * Used for price displays to create visual impact.
 */

"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1.5 }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration });

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <motion.span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
