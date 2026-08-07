-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "coatingType" TEXT NOT NULL,
    "garageSize" TEXT NOT NULL,
    "estimatedLow" DOUBLE PRECISION NOT NULL,
    "estimatedHigh" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculation" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "coatingType" TEXT NOT NULL,
    "garageSize" TEXT NOT NULL,
    "floorCondition" TEXT NOT NULL,
    "estimateLow" DOUBLE PRECISION NOT NULL,
    "estimateHigh" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);
