/**
 * ResultPage Component
 * 
 * Comprehensive results page with all conversion-focused components.
 * Integrates header, estimate, recommendation, breakdown, factors, market data, and CTAs.
 * Includes three-level CTA system: Hero, Sticky Bottom, and Final.
 */

"use client";

import { motion } from "framer-motion";
import { ResultHeader } from "../result/ResultHeader";
import { EstimateCard } from "../result/EstimateCard";
import { RecommendationCard } from "../result/RecommendationCard";
import { BreakdownCard } from "../result/BreakdownCard";
import { PriceFactorsCard } from "../result/PriceFactorsCard";
import { MarketComparisonCard } from "../result/MarketComparisonCard";
import { CallToActionCard } from "../result/CallToActionCard";
import { StickyBottomCTA } from "../result/StickyBottomCTA";
import { colors } from "../../lib/design-system";
import type { CalculatorResult, CalculatorInput } from "../../types/calculator";
import { useEffect, useState, useRef } from "react";

interface ResultPageProps {
  result: CalculatorResult;
  input: CalculatorInput;
  onRestart: () => void;
  onGetQuotes: () => void;
  isLeadModalOpen?: boolean;
}

export function ResultPage({ result, input, onRestart, onGetQuotes, isLeadModalOpen = false }: ResultPageProps) {
  const midPoint = Math.round((result.estimatedLow + result.estimatedHigh) / 2);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Show sticky CTA after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStickyVisible(true);
    }, 1500); // Show after 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  // Detect when near footer to hide sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const distanceToFooter = rect.top - window.innerHeight;
        setNearFooter(distanceToFooter < 300); // Hide when within 300px of footer
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide sticky CTA when lead modal is open
  const shouldShowSticky = stickyVisible && !nearFooter && !isLeadModalOpen;

  return (
    <div
      className="min-h-screen py-12 px-6 pb-32"
      style={{ background: colors.gradients.background }}
    >
      <div className="max-w-4xl mx-auto">
        <ResultHeader
          estimatedLow={result.estimatedLow}
          estimatedHigh={result.estimatedHigh}
          onGetQuotes={onGetQuotes}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <EstimateCard
            estimatedLow={result.estimatedLow}
            estimatedHigh={result.estimatedHigh}
            confidence={result.confidence}
          />
          <RecommendationCard
            recommendedSystem={result.recommendedSystem}
            coatingType={input.coatingType}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <BreakdownCard total={midPoint} />
          <PriceFactorsCard input={input} />
        </div>

        <MarketComparisonCard userEstimate={midPoint} />

        <div className="mt-6" ref={footerRef}>
          <CallToActionCard
            onGetQuotes={onGetQuotes}
            onRestart={onRestart}
          />
        </div>
      </div>

      <StickyBottomCTA
        estimatedLow={result.estimatedLow}
        estimatedHigh={result.estimatedHigh}
        onGetQuotes={onGetQuotes}
        visible={shouldShowSticky}
        nearFooter={nearFooter}
      />
    </div>
  );
}
