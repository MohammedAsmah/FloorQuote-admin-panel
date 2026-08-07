/**
 * FloorQuote Pricing Engine
 * 
 * Calculates garage floor coating estimates based on Calgary market pricing.
 * Implements a modular pricing model with base rates, condition adjustments,
 * and additive fixed costs for special features.
 */

import type {
  CalculatorInput,
  CalculatorResult,
  CoatingType,
  FloorCondition,
  CrackLevel,
  ExistingCoating,
  DecorativeFinish,
} from "../types/calculator";

// ---------------------------------------------------------------------------
// Base Pricing Configuration (Calgary Market)
// ---------------------------------------------------------------------------

interface BasePricing {
  low: number;
  high: number;
}

const BASE_PRICING: Record<CoatingType, BasePricing> = {
  epoxy: { low: 3, high: 8 },
  polyaspartic: { low: 6, high: 10 },
  polyurea: { low: 8, high: 12 },
  metallic: { low: 8, high: 12 },
  quartz: { low: 7, high: 11 },
  not_sure: { low: 6, high: 10 }, // Default to polyaspartic pricing
};

// ---------------------------------------------------------------------------
// Adjustment Multipliers
// ---------------------------------------------------------------------------

const FLOOR_CONDITION_MULTIPLIERS: Record<FloorCondition, number> = {
  excellent: 1.0,
  good: 1.05,
  fair: 1.15,
  poor: 1.30,
};

const CRACK_LEVEL_MULTIPLIERS: Record<CrackLevel, number> = {
  none: 1.0,
  minor: 1.05,
  several: 1.10,
  major: 1.20,
};

const EXISTING_COATING_MULTIPLIERS: Record<ExistingCoating, number> = {
  none: 1.0,
  paint: 1.05,
  epoxy: 1.15,
};

const DECORATIVE_FINISH_MULTIPLIERS: Record<DecorativeFinish, number> = {
  none: 1.0,
  standard_flakes: 1.05,
  premium_flakes: 1.10,
};

// ---------------------------------------------------------------------------
// Fixed Costs
// ---------------------------------------------------------------------------

const STEM_WALL_COST = 250;
const STEP_COST = 100;
const MOISTURE_ISSUES_MULTIPLIER = 1.20;

// ---------------------------------------------------------------------------
// Recommendation Logic
// ---------------------------------------------------------------------------

/**
 * Determines the recommended coating system based on input parameters.
 * Prioritizes moisture resistance, then user preference, then use case.
 */
function getRecommendation(input: CalculatorInput): string {
  // Moisture issues require polyaspartic for superior resistance
  if (input.moistureIssues) {
    return "Polyaspartic coating system (recommended for moisture resistance)";
  }

  // If user is unsure, recommend based on typical use cases
  if (input.coatingType === "not_sure") {
    // Default recommendation for most users
    return "Polyaspartic coating system (best balance of durability and value)";
  }

  // Respect user's choice but add context
  const coatingLabels: Record<CoatingType, string> = {
    epoxy: "Epoxy coating system",
    polyaspartic: "Polyaspartic coating system",
    polyurea: "Polyurea coating system (ideal for heavy-use garages)",
    metallic: "Metallic coating system",
    quartz: "Quartz coating system",
    not_sure: "Polyaspartic coating system",
  };

  return coatingLabels[input.coatingType];
}

/**
 * Determines confidence level based on input completeness and clarity.
 */
function getConfidence(input: CalculatorInput): "low" | "medium" | "high" {
  if (input.coatingType === "not_sure") {
    return "medium";
  }

  if (input.floorCondition === "poor" || input.crackLevel === "major") {
    return "low";
  }

  return "high";
}

// ---------------------------------------------------------------------------
// Main Calculation Function
// ---------------------------------------------------------------------------

/**
 * Calculates a garage floor coating estimate based on input parameters.
 * 
 * @param input - Validated calculator input
 * @returns Calculator result with low/high estimates and recommendations
 */
export function calculateEstimate(input: CalculatorInput): CalculatorResult {
  // Get base pricing for selected coating type
  const basePricing = BASE_PRICING[input.coatingType];

  // Start with base price per square foot
  let lowPrice = basePricing.low;
  let highPrice = basePricing.high;

  // Apply floor condition multiplier
  const floorConditionMultiplier = FLOOR_CONDITION_MULTIPLIERS[input.floorCondition];
  lowPrice *= floorConditionMultiplier;
  highPrice *= floorConditionMultiplier;

  // Apply crack level multiplier
  const crackMultiplier = CRACK_LEVEL_MULTIPLIERS[input.crackLevel];
  lowPrice *= crackMultiplier;
  highPrice *= crackMultiplier;

  // Apply existing coating multiplier
  const existingCoatingMultiplier = EXISTING_COATING_MULTIPLIERS[input.existingCoating];
  lowPrice *= existingCoatingMultiplier;
  highPrice *= existingCoatingMultiplier;

  // Apply decorative finish multiplier
  const decorativeMultiplier = DECORATIVE_FINISH_MULTIPLIERS[input.decorativeFinish];
  lowPrice *= decorativeMultiplier;
  highPrice *= decorativeMultiplier;

  // Apply moisture issues multiplier
  if (input.moistureIssues) {
    lowPrice *= MOISTURE_ISSUES_MULTIPLIER;
    highPrice *= MOISTURE_ISSUES_MULTIPLIER;
  }

  // Calculate base cost from square footage
  let lowTotal = lowPrice * input.squareFeet;
  let highTotal = highPrice * input.squareFeet;

  // Add fixed costs for stem walls
  if (input.stemWalls) {
    lowTotal += STEM_WALL_COST;
    highTotal += STEM_WALL_COST;
  }

  // Add fixed costs for each step
  if (input.stepsCount > 0) {
    lowTotal += input.stepsCount * STEP_COST;
    highTotal += input.stepsCount * STEP_COST;
  }

  // Round to nearest dollar
  const estimatedLow = Math.round(lowTotal);
  const estimatedHigh = Math.round(highTotal);

  // Generate recommendation and confidence
  const recommendedSystem = getRecommendation(input);
  const confidence = getConfidence(input);

  return {
    estimatedLow,
    estimatedHigh,
    recommendedSystem,
    confidence,
  };
}
