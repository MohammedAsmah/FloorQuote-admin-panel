// ---------------------------------------------------------------------------
// Lead types
// ---------------------------------------------------------------------------

export type LeadCalculation = {
  city: string;
  squareFeet: number;
  garageSize: string;
  estimatedLow: number;
  estimatedHigh: number;
  coatingType: string;
  floorCondition: string;
  crackLevel: string;
  existingCoating: string;
  decorativeFinish: string;
  stemWalls: boolean;
  stepsCount: number;
  moistureIssues: boolean;
  timeline: string;
  recommendedSystem: string;
};

export type LeadTableRow = {
  id: string;
  referenceNumber: string;
  source: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string | null;
  estimate: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;

  // Contact preferences
  preferredContactMethod: string;
  preferredContactTime: string;

  // Legacy calculator fields
  propertyType: string | null;
  garageEmpty: boolean | null;

  // Direct quote fields
  projectType: string | null;
  projectTypeOther: string | null;
  garageSizeDirect: string | null;
  squareFeetDirect: number | null;
  coatingTypeDirect: string | null;
  floorConditionDirect: string | null;
  existingCoatingDirect: string | null;
  existingCoatingOther: string | null;
  moistureIssueDirect: string | null;
  timelineDirect: string | null;
  garageAvailability: string | null;

  // Notes & financials
  additionalNotes: string | null;
  internalNotes: string | null;
  saleValue: number | null;
  soldAt: string | null;

  // Nested calculation (present for CALCULATOR leads)
  calculation: LeadCalculation | null;
};

// ---------------------------------------------------------------------------
// Dashboard / activity types
// ---------------------------------------------------------------------------

export type RecentActivityRow = {
  id: string;
  referenceNumber: string;
  name: string;
  phone: string;
  city: string;
  status: string;
  createdAt: Date;
};
