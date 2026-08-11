import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { prisma } from "@/lib/prisma";
import { ContractorStatus, LeadStatus } from "@/generated/prisma/enums";

export async function getDashboardMetrics() {
  const now = new Date();
  const today = startOfDay(now);
  const week = startOfWeek(now, { weekStartsOn: 1 });
  const month = startOfMonth(now);

  const [todaysLeads, thisWeek, thisMonth, pendingLeads, soldLeads, completedLeads, leadCount] =
    await prisma.$transaction([
      prisma.lead.count({ where: { createdAt: { gte: today } } }),
      prisma.lead.count({ where: { createdAt: { gte: week } } }),
      prisma.lead.count({ where: { createdAt: { gte: month } } }),
      prisma.lead.count({
        where: {
          status: { in: [LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.IN_PROGRESS] },
        },
      }),
      prisma.lead.count({ where: { status: LeadStatus.COMPLETED } }),
      prisma.lead.findMany({
        where: { status: LeadStatus.COMPLETED, saleValue: { not: null } },
        select: { saleValue: true },
      }),
      prisma.lead.count(),
    ]);

  const totalRevenue = completedLeads.reduce((sum, lead) => sum + (lead.saleValue ?? 0), 0);
  const averageLeadValue = completedLeads.length ? totalRevenue / completedLeads.length : 0;
  const conversionRate = leadCount ? (soldLeads / leadCount) * 100 : 0;

  return {
    todaysLeads,
    thisWeek,
    thisMonth,
    pendingLeads,
    soldLeads,
    revenue: Number(totalRevenue.toFixed(2)),
    averageLeadValue: Number(averageLeadValue.toFixed(2)),
    conversionRate: Number(conversionRate.toFixed(1)),
  };
}

export async function getRecentActivity(limit = 6) {
  const activity = await prisma.lead.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: { calculation: true },
  });

  return activity.map((lead) => ({
    id: lead.id,
    referenceNumber: lead.referenceNumber,
    name: lead.name,
    phone: lead.phone,
    city: lead.calculation?.city ?? lead.city ?? "Calgary",
    status: lead.status,
    createdAt: lead.createdAt,
  }));
}

export async function getLeads() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { calculation: true },
    take: 100,
  });

  return leads.map((lead) => ({
    id: lead.id,
    referenceNumber: lead.referenceNumber,
    source: lead.source,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    city: lead.calculation?.city ?? lead.city ?? "Calgary",
    postalCode: lead.postalCode ?? null,
    estimate: lead.calculation?.estimatedHigh ?? null,
    status: lead.status,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),

    // Contact preferences
    preferredContactMethod: lead.preferredContactMethod,
    preferredContactTime: lead.preferredContactTime,

    // Legacy calculator fields
    propertyType: lead.propertyType ?? null,
    garageEmpty: lead.garageEmpty ?? null,

    // Direct quote fields
    projectType: lead.projectType ?? null,
    projectTypeOther: lead.projectTypeOther ?? null,
    garageSizeDirect: lead.garageSizeDirect ?? null,
    squareFeetDirect: lead.squareFeetDirect ?? null,
    coatingTypeDirect: lead.coatingTypeDirect ?? null,
    floorConditionDirect: lead.floorConditionDirect ?? null,
    existingCoatingDirect: lead.existingCoatingDirect ?? null,
    existingCoatingOther: lead.existingCoatingOther ?? null,
    moistureIssueDirect: lead.moistureIssueDirect ?? null,
    timelineDirect: lead.timelineDirect ?? null,
    garageAvailability: lead.garageAvailability ?? null,

    // Notes & financials
    additionalNotes: lead.additionalNotes ?? null,
    internalNotes: lead.internalNotes ?? null,
    saleValue: lead.saleValue ?? null,
    soldAt: lead.soldAt?.toISOString() ?? null,

    // Nested calculation — only present for CALCULATOR source leads
    calculation: lead.calculation
      ? {
          city: lead.calculation.city,
          squareFeet: lead.calculation.squareFeet,
          garageSize: lead.calculation.garageSize,
          estimatedLow: lead.calculation.estimatedLow,
          estimatedHigh: lead.calculation.estimatedHigh,
          coatingType: lead.calculation.coatingType,
          floorCondition: lead.calculation.floorCondition,
          crackLevel: lead.calculation.crackLevel,
          existingCoating: lead.calculation.existingCoating,
          decorativeFinish: lead.calculation.decorativeFinish,
          stemWalls: lead.calculation.stemWalls,
          stepsCount: lead.calculation.stepsCount,
          moistureIssues: lead.calculation.moistureIssues,
          timeline: lead.calculation.timeline,
          recommendedSystem: lead.calculation.recommendedSystem,
        }
      : null,
  }));
}

export async function getLeadDetails(id: string) {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      calculation: true,
      assignments: {
        include: { contractor: true },
        orderBy: { assignedAt: "desc" },
      },
    },
  });
}

export async function getContractors() {
  return prisma.contractor.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      assignments: {
        select: { id: true, sold: true },
      },
    },
  });
}

export async function getAssignments() {
  return prisma.assignment.findMany({
    orderBy: { assignedAt: "desc" },
    include: {
      lead: { include: { calculation: true } },
      contractor: true,
    },
    take: 100,
  });
}

export async function getRevenueSummary() {
  const soldLeads = await prisma.lead.findMany({
    where: { status: LeadStatus.COMPLETED },
    include: { calculation: true },
    orderBy: { updatedAt: "desc" },
    take: 12,
  });

  const monthlyRevenueRows = await prisma.lead.findMany({
    where: { status: LeadStatus.COMPLETED, saleValue: { not: null }, soldAt: { not: null } },
    select: { saleValue: true, soldAt: true },
    orderBy: { soldAt: "desc" },
    take: 100,
  });

  const monthlyRevenue = monthlyRevenueRows.reduce<Record<string, number>>((acc, row) => {
    const soldAt = row.soldAt as Date;
    const key = `${soldAt.getFullYear()}-${String(soldAt.getMonth() + 1).padStart(2, "0")}`;
    acc[key] = (acc[key] ?? 0) + (row.saleValue ?? 0);
    return acc;
  }, {});

  const bestContractor = await prisma.contractor.findFirst({
    orderBy: { updatedAt: "desc" },
    include: { assignments: true },
  });

  return {
    soldLeads,
    monthlyRevenue,
    bestContractor,
  };
}

export async function getAnalyticsOverview() {
  const leads = await prisma.lead.findMany({
    include: { calculation: true },
  });

  const leadVolume = leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.status] = (acc[lead.status] ?? 0) + 1;
    return acc;
  }, {});

  const topCities = leads.reduce<Record<string, number>>((acc, lead) => {
    const city = lead.calculation?.city ?? lead.city ?? "Calgary";
    acc[city] = (acc[city] ?? 0) + 1;
    return acc;
  }, {});

  const coatingCounts = leads.reduce<Record<string, number>>((acc, lead) => {
    const coating = lead.calculation?.coatingType ?? lead.coatingTypeDirect ?? "unknown";
    acc[coating] = (acc[coating] ?? 0) + 1;
    return acc;
  }, {});

  const leadsWithEstimate = leads.filter((l) => l.calculation?.estimatedHigh != null);
  const averageEstimate = leadsWithEstimate.length
    ? leadsWithEstimate.reduce((sum, lead) => sum + (lead.calculation?.estimatedHigh ?? 0), 0) / leadsWithEstimate.length
    : 0;

  const timelineDemand = leads.reduce<Record<string, number>>((acc, lead) => {
    const timeline = lead.calculation?.timeline ?? lead.timelineDirect ?? "unknown";
    acc[timeline] = (acc[timeline] ?? 0) + 1;
    return acc;
  }, {});

  return {
    leadVolume,
    topCities,
    coatingCounts,
    averageEstimate: Number(averageEstimate.toFixed(2)),
    timelineDemand,
  };
}

export async function getAdminSettings() {
  const businessProfile = await prisma.businessSetting.findFirst();
  const supportedCities = await prisma.supportedCity.findMany({ orderBy: { name: "asc" } });
  const emailTemplates = await prisma.emailTemplate.findMany({ orderBy: { updatedAt: "desc" } });

  return {
    businessProfile,
    supportedCities,
    emailTemplates,
  };
}

export async function getSupportedCities() {
  return prisma.supportedCity.findMany({ orderBy: { name: "asc" } });
}

export async function getBusinessProfile() {
  return prisma.businessSetting.findFirst();
}
