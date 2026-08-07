/**
 * Lead Validation Schemas
 * 
 * Zod schemas for validating lead capture form data.
 * Used with React Hook Form for type-safe form validation.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Enums (mirror Prisma schema)
// ---------------------------------------------------------------------------

export const PROPERTY_TYPES = ["detached", "semi_detached", "townhouse", "commercial"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PREFERRED_CONTACT_TIMES = ["morning", "afternoon", "evening", "any"] as const;
export type PreferredContactTime = (typeof PREFERRED_CONTACT_TIMES)[number];

// ---------------------------------------------------------------------------
// Step 1: Contact Information Schema
// ---------------------------------------------------------------------------

export const contactInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long")
    .regex(/^[+]?[\d\s\-()]+$/, "Invalid phone number format"),
  preferredContactMethod: z.enum(["email", "phone", "text"]),
});

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;

// ---------------------------------------------------------------------------
// Step 2: Project Information Schema
// ---------------------------------------------------------------------------

export const projectInfoSchema = z.object({
  coatingType: z.enum(["epoxy", "polyaspartic", "polyurea", "metallic", "quartz", "not_sure"]),
  timeline: z.enum(["asap", "within_month", "within_three_months", "flexible"]),
});

export type ProjectInfoFormData = z.infer<typeof projectInfoSchema>;

// ---------------------------------------------------------------------------
// Step 3: Additional Information Schema
// ---------------------------------------------------------------------------

export const additionalInfoSchema = z.object({
  propertyType: z.enum(PROPERTY_TYPES),
  garageEmpty: z.boolean(),
  preferredContactTime: z.enum(PREFERRED_CONTACT_TIMES),
  additionalNotes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

export type AdditionalInfoFormData = z.infer<typeof additionalInfoSchema>;

// ---------------------------------------------------------------------------
// Complete Lead Schema (combined)
// ---------------------------------------------------------------------------

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long")
    .regex(/^[+]?[\d\s\-()]+$/, "Invalid phone number format"),
  preferredContactMethod: z.enum(["email", "phone", "text"]),

  propertyType: z.enum(PROPERTY_TYPES),
  garageEmpty: z.boolean(),
  preferredContactTime: z.enum(PREFERRED_CONTACT_TIMES),
  additionalNotes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

// ---------------------------------------------------------------------------
// Calculator Input for Lead Context
// ---------------------------------------------------------------------------

export interface LeadCalculatorContext {
  city: string;
  squareFeet: number;
  coatingType: string;
  floorCondition: string;
  crackLevel: string;
  existingCoating: string;
  decorativeFinish: string;
  stemWalls: boolean;
  stepsCount: number;
  moistureIssues: boolean;
  timeline: string;
  garageSize?: string;
  estimatedLow: number;
  estimatedHigh: number;
  recommendedSystem: string;
}
