/**
 * FloorQuote Calculator Validation Schemas
 * 
 * Strict Zod schemas for validating calculator inputs and lead information.
 * Ensures type safety across the application layer.
 */

import { z } from "zod";
import type {
  GarageSize,
  CoatingType,
  FloorCondition,
  CrackLevel,
  ExistingCoating,
  DecorativeFinish,
  Timeline,
  PreferredContactMethod,
} from "../../types/calculator";

// ---------------------------------------------------------------------------
// Enum Schemas (mirror Prisma enums and TypeScript types)
// ---------------------------------------------------------------------------

const GarageSizeSchema = z.enum([
  "one_car",
  "two_car",
  "three_car",
  "oversized",
]) satisfies z.ZodType<GarageSize>;

const CoatingTypeSchema = z.enum([
  "epoxy",
  "polyaspartic",
  "polyurea",
  "metallic",
  "quartz",
  "not_sure",
]) satisfies z.ZodType<CoatingType>;

const FloorConditionSchema = z.enum([
  "excellent",
  "good",
  "fair",
  "poor",
]) satisfies z.ZodType<FloorCondition>;

const CrackLevelSchema = z.enum([
  "none",
  "minor",
  "several",
  "major",
]) satisfies z.ZodType<CrackLevel>;

const ExistingCoatingSchema = z.enum([
  "none",
  "paint",
  "epoxy",
]) satisfies z.ZodType<ExistingCoating>;

const DecorativeFinishSchema = z.enum([
  "none",
  "standard_flakes",
  "premium_flakes",
]) satisfies z.ZodType<DecorativeFinish>;

const TimelineSchema = z.enum([
  "asap",
  "within_month",
  "within_three_months",
  "flexible",
]) satisfies z.ZodType<Timeline>;

const PreferredContactMethodSchema = z.enum([
  "email",
  "phone",
  "text",
]) satisfies z.ZodType<PreferredContactMethod>;

// ---------------------------------------------------------------------------
// Calculator Input Schema
// ---------------------------------------------------------------------------

/**
 * Validates the complete calculator input form.
 * All fields are required except garageSize (optional for calculation).
 */
export const CalculatorInputSchema = z.object({
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City name too long")
    .trim(),
  squareFeet: z
    .number()
    .min(100, "Minimum garage size is 100 sq ft")
    .max(5000, "Maximum garage size is 5000 sq ft"),
  coatingType: CoatingTypeSchema,
  floorCondition: FloorConditionSchema,
  crackLevel: CrackLevelSchema,
  existingCoating: ExistingCoatingSchema,
  decorativeFinish: DecorativeFinishSchema,
  stemWalls: z.boolean(),
  stepsCount: z
    .number()
    .int("Steps count must be a whole number")
    .min(0, "Steps count cannot be negative")
    .max(20, "Steps count cannot exceed 20"),
  moistureIssues: z.boolean(),
  timeline: TimelineSchema,
  garageSize: GarageSizeSchema.optional(),
});

// ---------------------------------------------------------------------------
// Lead Schema
// ---------------------------------------------------------------------------

/**
 * Validates lead/contact information submitted after calculation.
 */
export const LeadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email too long")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number too long")
    .trim(),
  preferredContactMethod: PreferredContactMethodSchema,
});

// ---------------------------------------------------------------------------
// Combined Schema for Full Submission
// ---------------------------------------------------------------------------

/**
 * Validates the complete submission including calculator input and lead info.
 * Used when user submits both calculation and contact information together.
 */
export const CalculatorSubmissionSchema = CalculatorInputSchema.and(
  z.object({
    lead: LeadSchema,
  })
);

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type CalculatorInput = z.infer<typeof CalculatorInputSchema>;
export type Lead = z.infer<typeof LeadSchema>;
export type CalculatorSubmission = z.infer<typeof CalculatorSubmissionSchema>;
