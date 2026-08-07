import { z } from "zod";

export const contractorSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Enter a valid email address"),
  website: z.string().url("Enter a valid website").optional().or(z.literal("")),
  cities: z.string().min(1, "At least one city is required"),
  services: z.string().min(1, "At least one service is required"),
  leadPrice: z.number().min(0, "Lead price must be positive"),
  notes: z.string().optional(),
  status: z.enum(["ACTIVE", "PAUSED", "ARCHIVED"]),
});

export const businessSettingsSchema = z.object({
  companyName: z.string().min(2, "Business name is required"),
  email: z.string().email("A valid business email is required"),
  phone: z.string().min(10, "A valid phone number is required"),
  defaultLeadPrice: z.number().min(0, "Default lead price must be positive"),
  leadPricingMessage: z.string().optional(),
  supportEmail: z.string().email("A support email is required"),
});
