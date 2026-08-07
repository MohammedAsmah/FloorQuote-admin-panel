/**
 * FloorQuote Calculator Tests
 * 
 * Comprehensive test suite for the pricing engine.
 * Tests all coating types, conditions, crack levels, and edge cases.
 */

import { describe, it, expect } from "vitest";
import { calculateEstimate } from "./calculator";
import type { CalculatorInput } from "../types/calculator";

// ---------------------------------------------------------------------------
// Test Helpers
// ---------------------------------------------------------------------------

function createBaseInput(overrides: Partial<CalculatorInput> = {}): CalculatorInput {
  return {
    city: "Calgary",
    squareFeet: 400,
    coatingType: "epoxy",
    floorCondition: "good",
    crackLevel: "none",
    existingCoating: "none",
    decorativeFinish: "none",
    stemWalls: false,
    stepsCount: 0,
    moistureIssues: false,
    timeline: "flexible",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Coating Type Tests
// ---------------------------------------------------------------------------

describe("Coating Types", () => {
  it("should calculate epoxy pricing correctly", () => {
    const input = createBaseInput({ coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    // Epoxy base: $3-8 per sq ft
    // 400 sq ft * $3 = $1200 (low)
    // 400 sq ft * $8 = $3200 (high)
    // Good condition: +5% multiplier
    // Expected: $1260 - $3360
    expect(result.estimatedLow).toBeGreaterThanOrEqual(1200);
    expect(result.estimatedLow).toBeLessThanOrEqual(1300);
    expect(result.estimatedHigh).toBeGreaterThanOrEqual(3200);
    expect(result.estimatedHigh).toBeLessThanOrEqual(3400);
    expect(result.recommendedSystem).toContain("Epoxy");
  });

  it("should calculate polyaspartic pricing correctly", () => {
    const input = createBaseInput({ coatingType: "polyaspartic", squareFeet: 400 });
    const result = calculateEstimate(input);

    // Polyaspartic base: $6-10 per sq ft
    // 400 sq ft * $6 = $2400 (low)
    // 400 sq ft * $10 = $4000 (high)
    // Good condition: +5% multiplier
    expect(result.estimatedLow).toBeGreaterThanOrEqual(2400);
    expect(result.estimatedLow).toBeLessThanOrEqual(2600);
    expect(result.estimatedHigh).toBeGreaterThanOrEqual(4000);
    expect(result.estimatedHigh).toBeLessThanOrEqual(4200);
  });

  it("should calculate polyurea pricing correctly", () => {
    const input = createBaseInput({ coatingType: "polyurea", squareFeet: 400 });
    const result = calculateEstimate(input);

    // Polyurea base: $8-12 per sq ft
    // 400 sq ft * $8 = $3200 (low)
    // 400 sq ft * $12 = $4800 (high)
    expect(result.estimatedLow).toBeGreaterThanOrEqual(3200);
    expect(result.estimatedLow).toBeLessThanOrEqual(3400);
    expect(result.estimatedHigh).toBeGreaterThanOrEqual(4800);
    expect(result.estimatedHigh).toBeLessThanOrEqual(5100);
  });

  it("should calculate metallic pricing correctly", () => {
    const input = createBaseInput({ coatingType: "metallic", squareFeet: 400 });
    const result = calculateEstimate(input);

    // Metallic base: $8-12 per sq ft
    expect(result.estimatedLow).toBeGreaterThanOrEqual(3200);
    expect(result.estimatedLow).toBeLessThanOrEqual(3400);
    expect(result.estimatedHigh).toBeGreaterThanOrEqual(4800);
    expect(result.estimatedHigh).toBeLessThanOrEqual(5100);
  });

  it("should calculate quartz pricing correctly", () => {
    const input = createBaseInput({ coatingType: "quartz", squareFeet: 400 });
    const result = calculateEstimate(input);

    // Quartz base: $7-11 per sq ft
    // 400 sq ft * $7 = $2800 (low)
    // 400 sq ft * $11 = $4400 (high)
    expect(result.estimatedLow).toBeGreaterThanOrEqual(2800);
    expect(result.estimatedLow).toBeLessThanOrEqual(3000);
    expect(result.estimatedHigh).toBeGreaterThanOrEqual(4400);
    expect(result.estimatedHigh).toBeLessThanOrEqual(4700);
  });
});

// ---------------------------------------------------------------------------
// Floor Condition Tests
// ---------------------------------------------------------------------------

describe("Floor Conditions", () => {
  it("should apply excellent condition multiplier (0%)", () => {
    const input = createBaseInput({ floorCondition: "excellent", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    // Epoxy base: $3-8, no multiplier
    expect(result.estimatedLow).toBeGreaterThanOrEqual(1180);
    expect(result.estimatedLow).toBeLessThanOrEqual(1220);
  });

  it("should apply good condition multiplier (+5%)", () => {
    const input = createBaseInput({ floorCondition: "good", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    // Epoxy base: $3-8, +5% multiplier
    expect(result.estimatedLow).toBeGreaterThanOrEqual(1250);
    expect(result.estimatedLow).toBeLessThanOrEqual(1280);
  });

  it("should apply fair condition multiplier (+15%)", () => {
    const input = createBaseInput({ floorCondition: "fair", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    // Epoxy base: $3-8, +15% multiplier
    expect(result.estimatedLow).toBeGreaterThanOrEqual(1350);
    expect(result.estimatedLow).toBeLessThanOrEqual(1400);
  });

  it("should apply poor condition multiplier (+30%)", () => {
    const input = createBaseInput({ floorCondition: "poor", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    // Epoxy base: $3-8, +30% multiplier
    expect(result.estimatedLow).toBeGreaterThanOrEqual(1550);
    expect(result.estimatedLow).toBeLessThanOrEqual(1620);
  });

  it("should increase price as condition worsens", () => {
    const excellent = calculateEstimate(createBaseInput({ floorCondition: "excellent", coatingType: "epoxy", squareFeet: 400 }));
    const good = calculateEstimate(createBaseInput({ floorCondition: "good", coatingType: "epoxy", squareFeet: 400 }));
    const fair = calculateEstimate(createBaseInput({ floorCondition: "fair", coatingType: "epoxy", squareFeet: 400 }));
    const poor = calculateEstimate(createBaseInput({ floorCondition: "poor", coatingType: "epoxy", squareFeet: 400 }));

    expect(excellent.estimatedLow).toBeLessThan(good.estimatedLow);
    expect(good.estimatedLow).toBeLessThan(fair.estimatedLow);
    expect(fair.estimatedLow).toBeLessThan(poor.estimatedLow);
  });
});

// ---------------------------------------------------------------------------
// Crack Level Tests
// ---------------------------------------------------------------------------

describe("Crack Levels", () => {
  it("should apply no crack multiplier (0%)", () => {
    const input = createBaseInput({ crackLevel: "none", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1250);
    expect(result.estimatedLow).toBeLessThanOrEqual(1280);
  });

  it("should apply minor crack multiplier (+5%)", () => {
    const input = createBaseInput({ crackLevel: "minor", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1300);
    expect(result.estimatedLow).toBeLessThanOrEqual(1350);
  });

  it("should apply several cracks multiplier (+10%)", () => {
    const input = createBaseInput({ crackLevel: "several", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1370);
    expect(result.estimatedLow).toBeLessThanOrEqual(1420);
  });

  it("should apply major cracks multiplier (+20%)", () => {
    const input = createBaseInput({ crackLevel: "major", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1500);
    expect(result.estimatedLow).toBeLessThanOrEqual(1560);
  });

  it("should increase price as crack severity increases", () => {
    const none = calculateEstimate(createBaseInput({ crackLevel: "none", coatingType: "epoxy", squareFeet: 400 }));
    const minor = calculateEstimate(createBaseInput({ crackLevel: "minor", coatingType: "epoxy", squareFeet: 400 }));
    const several = calculateEstimate(createBaseInput({ crackLevel: "several", coatingType: "epoxy", squareFeet: 400 }));
    const major = calculateEstimate(createBaseInput({ crackLevel: "major", coatingType: "epoxy", squareFeet: 400 }));

    expect(none.estimatedLow).toBeLessThan(minor.estimatedLow);
    expect(minor.estimatedLow).toBeLessThan(several.estimatedLow);
    expect(several.estimatedLow).toBeLessThan(major.estimatedLow);
  });
});

// ---------------------------------------------------------------------------
// Existing Coating Tests
// ---------------------------------------------------------------------------

describe("Existing Coating", () => {
  it("should apply no existing coating multiplier (0%)", () => {
    const input = createBaseInput({ existingCoating: "none", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1250);
    expect(result.estimatedLow).toBeLessThanOrEqual(1280);
  });

  it("should apply paint removal multiplier (+5%)", () => {
    const input = createBaseInput({ existingCoating: "paint", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1300);
    expect(result.estimatedLow).toBeLessThanOrEqual(1350);
  });

  it("should apply epoxy removal multiplier (+15%)", () => {
    const input = createBaseInput({ existingCoating: "epoxy", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1430);
    expect(result.estimatedLow).toBeLessThanOrEqual(1490);
  });

  it("should increase price when coating removal is required", () => {
    const none = calculateEstimate(createBaseInput({ existingCoating: "none", coatingType: "epoxy", squareFeet: 400 }));
    const paint = calculateEstimate(createBaseInput({ existingCoating: "paint", coatingType: "epoxy", squareFeet: 400 }));
    const epoxy = calculateEstimate(createBaseInput({ existingCoating: "epoxy", coatingType: "epoxy", squareFeet: 400 }));

    expect(none.estimatedLow).toBeLessThan(paint.estimatedLow);
    expect(paint.estimatedLow).toBeLessThan(epoxy.estimatedLow);
  });
});

// ---------------------------------------------------------------------------
// Decorative Finish Tests
// ---------------------------------------------------------------------------

describe("Decorative Finishes", () => {
  it("should apply no decorative finish multiplier (0%)", () => {
    const input = createBaseInput({ decorativeFinish: "none", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1250);
    expect(result.estimatedLow).toBeLessThanOrEqual(1280);
  });

  it("should apply standard flakes multiplier (+5%)", () => {
    const input = createBaseInput({ decorativeFinish: "standard_flakes", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1300);
    expect(result.estimatedLow).toBeLessThanOrEqual(1350);
  });

  it("should apply premium flakes multiplier (+10%)", () => {
    const input = createBaseInput({ decorativeFinish: "premium_flakes", coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(1370);
    expect(result.estimatedLow).toBeLessThanOrEqual(1420);
  });
});

// ---------------------------------------------------------------------------
// Fixed Costs Tests
// ---------------------------------------------------------------------------

describe("Fixed Costs", () => {
  it("should add stem wall cost (+$250)", () => {
    const withoutStem = calculateEstimate(createBaseInput({ stemWalls: false, coatingType: "epoxy", squareFeet: 400 }));
    const withStem = calculateEstimate(createBaseInput({ stemWalls: true, coatingType: "epoxy", squareFeet: 400 }));

    expect(withStem.estimatedLow).toBe(withoutStem.estimatedLow + 250);
    expect(withStem.estimatedHigh).toBe(withoutStem.estimatedHigh + 250);
  });

  it("should add step cost (+$100 per step)", () => {
    const noSteps = calculateEstimate(createBaseInput({ stepsCount: 0, coatingType: "epoxy", squareFeet: 400 }));
    const oneStep = calculateEstimate(createBaseInput({ stepsCount: 1, coatingType: "epoxy", squareFeet: 400 }));
    const twoSteps = calculateEstimate(createBaseInput({ stepsCount: 2, coatingType: "epoxy", squareFeet: 400 }));

    expect(oneStep.estimatedLow).toBe(noSteps.estimatedLow + 100);
    expect(twoSteps.estimatedLow).toBe(noSteps.estimatedLow + 200);
  });

  it("should add moisture issues multiplier (+20%)", () => {
    const withoutMoisture = calculateEstimate(createBaseInput({ moistureIssues: false, coatingType: "epoxy", squareFeet: 400 }));
    const withMoisture = calculateEstimate(createBaseInput({ moistureIssues: true, coatingType: "epoxy", squareFeet: 400 }));

    expect(withMoisture.estimatedLow).toBeGreaterThan(withoutMoisture.estimatedLow);
    expect(withMoisture.estimatedHigh).toBeGreaterThan(withoutMoisture.estimatedHigh);
  });

  it("should increase price when moisture issues exist", () => {
    const withoutMoisture = calculateEstimate(createBaseInput({ moistureIssues: false, coatingType: "epoxy", squareFeet: 400 }));
    const withMoisture = calculateEstimate(createBaseInput({ moistureIssues: true, coatingType: "epoxy", squareFeet: 400 }));

    // Moisture adds 20% multiplier
    expect(withMoisture.estimatedLow).toBeCloseTo(Math.round(withoutMoisture.estimatedLow * 1.2), -2);
  });
});

// ---------------------------------------------------------------------------
// Square Footage Tests
// ---------------------------------------------------------------------------

describe("Square Footage", () => {
  it("should increase price when square footage increases", () => {
    const small = calculateEstimate(createBaseInput({ squareFeet: 200, coatingType: "epoxy" }));
    const medium = calculateEstimate(createBaseInput({ squareFeet: 400, coatingType: "epoxy" }));
    const large = calculateEstimate(createBaseInput({ squareFeet: 800, coatingType: "epoxy" }));

    expect(small.estimatedLow).toBeLessThan(medium.estimatedLow);
    expect(medium.estimatedLow).toBeLessThan(large.estimatedLow);
  });

  it("should scale linearly with square footage", () => {
    const single = calculateEstimate(createBaseInput({ squareFeet: 100, coatingType: "epoxy" }));
    const double = calculateEstimate(createBaseInput({ squareFeet: 200, coatingType: "epoxy" }));

    expect(double.estimatedLow).toBeCloseTo(single.estimatedLow * 2, -2);
  });
});

// ---------------------------------------------------------------------------
// Recommendation Logic Tests
// ---------------------------------------------------------------------------

describe("Recommendation Logic", () => {
  it("should recommend Polyaspartic when moisture issues exist", () => {
    const input = createBaseInput({ moistureIssues: true, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(result.recommendedSystem).toContain("Polyaspartic");
    expect(result.recommendedSystem).toContain("moisture");
  });

  it("should recommend Polyaspartic when user is not sure", () => {
    const input = createBaseInput({ coatingType: "not_sure" });
    const result = calculateEstimate(input);

    expect(result.recommendedSystem).toContain("Polyaspartic");
  });

  it("should respect user's coating choice when specified", () => {
    const epoxyInput = createBaseInput({ coatingType: "epoxy" });
    const epoxyResult = calculateEstimate(epoxyInput);

    expect(epoxyResult.recommendedSystem).toContain("Epoxy");

    const polyureaInput = createBaseInput({ coatingType: "polyurea" });
    const polyureaResult = calculateEstimate(polyureaInput);

    expect(polyureaResult.recommendedSystem).toContain("Polyurea");
  });

  it("should recommend Polyurea for heavy-use context", () => {
    const input = createBaseInput({ coatingType: "polyurea" });
    const result = calculateEstimate(input);

    expect(result.recommendedSystem).toContain("Polyurea");
    expect(result.recommendedSystem).toContain("heavy-use");
  });
});

// ---------------------------------------------------------------------------
// Confidence Level Tests
// ---------------------------------------------------------------------------

describe("Confidence Levels", () => {
  it("should return medium confidence when coating type is not sure", () => {
    const input = createBaseInput({ coatingType: "not_sure" });
    const result = calculateEstimate(input);

    expect(result.confidence).toBe("medium");
  });

  it("should return low confidence for poor floor condition", () => {
    const input = createBaseInput({ floorCondition: "poor" });
    const result = calculateEstimate(input);

    expect(result.confidence).toBe("low");
  });

  it("should return low confidence for major cracks", () => {
    const input = createBaseInput({ crackLevel: "major" });
    const result = calculateEstimate(input);

    expect(result.confidence).toBe("low");
  });

  it("should return high confidence for good conditions", () => {
    const input = createBaseInput({ floorCondition: "good", crackLevel: "none", coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(result.confidence).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// Edge Case Tests
// ---------------------------------------------------------------------------

describe("Edge Cases", () => {
  it("should handle minimum square footage (100 sq ft)", () => {
    const input = createBaseInput({ squareFeet: 100, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThan(0);
    expect(result.estimatedHigh).toBeGreaterThan(result.estimatedLow);
    expect(Number.isInteger(result.estimatedLow)).toBe(true);
    expect(Number.isInteger(result.estimatedHigh)).toBe(true);
  });

  it("should handle very large garage (5000 sq ft)", () => {
    const input = createBaseInput({ squareFeet: 5000, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThan(0);
    expect(result.estimatedHigh).toBeGreaterThan(result.estimatedLow);
    expect(Number.isInteger(result.estimatedLow)).toBe(true);
    expect(Number.isInteger(result.estimatedHigh)).toBe(true);
  });

  it("should handle maximum steps (20 steps)", () => {
    const input = createBaseInput({ stepsCount: 20, coatingType: "epoxy", squareFeet: 400 });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThan(0);
    // 20 steps * $100 = $2000 additional
    const base = calculateEstimate(createBaseInput({ stepsCount: 0, coatingType: "epoxy", squareFeet: 400 }));
    expect(result.estimatedLow).toBe(base.estimatedLow + 2000);
  });

  it("should handle zero steps", () => {
    const input = createBaseInput({ stepsCount: 0, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThan(0);
    expect(result.estimatedHigh).toBeGreaterThan(result.estimatedLow);
  });

  it("should handle all multipliers combined", () => {
    const input = createBaseInput({
      floorCondition: "poor",
      crackLevel: "major",
      existingCoating: "epoxy",
      decorativeFinish: "premium_flakes",
      moistureIssues: true,
      coatingType: "epoxy",
      squareFeet: 400,
    });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThan(0);
    expect(result.estimatedHigh).toBeGreaterThan(result.estimatedLow);
  });
});

// ---------------------------------------------------------------------------
// Data Integrity Tests
// ---------------------------------------------------------------------------

describe("Data Integrity", () => {
  it("should never return negative values", () => {
    const input = createBaseInput({ squareFeet: 100, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThanOrEqual(0);
    expect(result.estimatedHigh).toBeGreaterThanOrEqual(0);
  });

  it("should never return NaN", () => {
    const input = createBaseInput({ squareFeet: 400, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(Number.isNaN(result.estimatedLow)).toBe(false);
    expect(Number.isNaN(result.estimatedHigh)).toBe(false);
  });

  it("should never return estimatedHigh lower than estimatedLow", () => {
    const input = createBaseInput({ squareFeet: 400, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(result.estimatedHigh).toBeGreaterThanOrEqual(result.estimatedLow);
  });

  it("should always return integer values", () => {
    const input = createBaseInput({ squareFeet: 400, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(Number.isInteger(result.estimatedLow)).toBe(true);
    expect(Number.isInteger(result.estimatedHigh)).toBe(true);
  });

  it("should always return a recommendation string", () => {
    const input = createBaseInput({ squareFeet: 400, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(typeof result.recommendedSystem).toBe("string");
    expect(result.recommendedSystem.length).toBeGreaterThan(0);
  });

  it("should always return a valid confidence level", () => {
    const input = createBaseInput({ squareFeet: 400, coatingType: "epoxy" });
    const result = calculateEstimate(input);

    expect(["low", "medium", "high"]).toContain(result.confidence);
  });
});

// ---------------------------------------------------------------------------
// Combined Scenario Tests
// ---------------------------------------------------------------------------

describe("Real-World Scenarios", () => {
  it("should calculate typical 2-car garage with epoxy", () => {
    const input = createBaseInput({
      squareFeet: 400,
      coatingType: "epoxy",
      floorCondition: "good",
      crackLevel: "minor",
      existingCoating: "none",
      decorativeFinish: "standard_flakes",
      stemWalls: true,
      stepsCount: 1,
      moistureIssues: false,
    });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThan(1500);
    expect(result.estimatedHigh).toBeGreaterThan(result.estimatedLow);
    expect(result.confidence).toBe("high");
  });

  it("should calculate premium garage with polyurea", () => {
    const input = createBaseInput({
      squareFeet: 600,
      coatingType: "polyurea",
      floorCondition: "excellent",
      crackLevel: "none",
      existingCoating: "none",
      decorativeFinish: "premium_flakes",
      stemWalls: true,
      stepsCount: 2,
      moistureIssues: false,
    });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThan(5000);
    expect(result.estimatedHigh).toBeGreaterThan(result.estimatedLow);
  });

  it("should calculate problematic garage requiring extensive prep", () => {
    const input = createBaseInput({
      squareFeet: 400,
      coatingType: "polyaspartic",
      floorCondition: "poor",
      crackLevel: "major",
      existingCoating: "epoxy",
      decorativeFinish: "none",
      stemWalls: false,
      stepsCount: 0,
      moistureIssues: true,
    });
    const result = calculateEstimate(input);

    expect(result.estimatedLow).toBeGreaterThan(4000);
    expect(result.recommendedSystem).toContain("Polyaspartic");
    expect(result.confidence).toBe("low");
  });
});
