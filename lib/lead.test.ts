import { describe, it, expect } from "vitest";
import {
  contactInfoSchema,
  additionalInfoSchema,
  leadSchema,
} from "./validations/lead";

describe("Lead Validation Schemas", () => {
  describe("Contact Information Schema (Step 1)", () => {
    it("should accept valid contact information", () => {
      const validContact = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "(403) 555-0199",
        preferredContactMethod: "email" as const,
      };

      const result = contactInfoSchema.safeParse(validContact);
      expect(result.success).toBe(true);
    });

    it("should reject name shorter than 2 characters", () => {
      const invalid = {
        name: "J",
        email: "jane@example.com",
        phone: "4035550199",
        preferredContactMethod: "phone" as const,
      };

      const result = contactInfoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("Name must be at least 2 characters");
      }
    });

    it("should reject invalid email format", () => {
      const invalid = {
        name: "Jane Doe",
        email: "invalid-email-address",
        phone: "4035550199",
        preferredContactMethod: "email" as const,
      };

      const result = contactInfoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("Invalid email address");
      }
    });

    it("should reject phone number with less than 10 digits", () => {
      const invalid = {
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "12345",
        preferredContactMethod: "text" as const,
      };

      const result = contactInfoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("Phone number must be at least 10 digits");
      }
    });
  });

  describe("Additional Information Schema (Step 3)", () => {
    it("should accept valid additional information", () => {
      const validAdditional = {
        propertyType: "detached" as const,
        garageEmpty: true,
        preferredContactTime: "morning" as const,
        additionalNotes: "Side entrance available.",
      };

      const result = additionalInfoSchema.safeParse(validAdditional);
      expect(result.success).toBe(true);
    });

    it("should accept optional notes when empty", () => {
      const validAdditional = {
        propertyType: "townhouse" as const,
        garageEmpty: false,
        preferredContactTime: "evening" as const,
      };

      const result = additionalInfoSchema.safeParse(validAdditional);
      expect(result.success).toBe(true);
    });

    it("should reject invalid property type", () => {
      const invalid = {
        propertyType: "castle",
        garageEmpty: true,
        preferredContactTime: "morning",
      };

      const result = additionalInfoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("Complete Combined Lead Schema", () => {
    it("should validate full lead payload", () => {
      const fullLead = {
        name: "Alex Smith",
        email: "alex@example.com",
        phone: "+14035550123",
        preferredContactMethod: "phone" as const,
        propertyType: "semi_detached" as const,
        garageEmpty: true,
        preferredContactTime: "afternoon" as const,
        additionalNotes: "Call before coming over.",
      };

      const result = leadSchema.safeParse(fullLead);
      expect(result.success).toBe(true);
    });
  });
});
