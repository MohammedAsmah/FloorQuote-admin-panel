-- CreateTable
CREATE TABLE "PricingRule" (
    "id" TEXT NOT NULL,
    "coatingType" "CoatingType" NOT NULL,
    "lowPerSqFt" DOUBLE PRECISION NOT NULL,
    "highPerSqFt" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdjustmentRule" (
    "id" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "key" TEXT,
    "percentChange" DOUBLE PRECISION,
    "fixedChange" DOUBLE PRECISION,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdjustmentRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityPricing" (
    "id" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "laborMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "materialMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "minimumProjectPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "supportedCityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CityPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GaragePreset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cars" INTEGER NOT NULL,
    "squareFeet" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GaragePreset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationRule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "conditions" JSONB NOT NULL,
    "recommend" "CoatingType" NOT NULL,
    "confidence" DOUBLE PRECISION,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecommendationRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalculationVersion" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "userId" TEXT,
    "userName" TEXT,
    "change" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalculationVersion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CityPricing" ADD CONSTRAINT "CityPricing_supportedCityId_fkey" FOREIGN KEY ("supportedCityId") REFERENCES "SupportedCity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
