/*
  Warnings:

  - You are about to drop the column `estimateHigh` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `estimateLow` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `coatingType` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedHigh` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedLow` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `garageSize` on the `Lead` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referenceNumber]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[calculationId]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `crackLevel` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `decorativeFinish` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedHigh` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedLow` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `existingCoating` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendedSystem` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squareFeet` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeline` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `coatingType` on the `Calculation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `garageSize` on the `Calculation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `floorCondition` on the `Calculation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `calculationId` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garageEmpty` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredContactMethod` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredContactTime` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceNumber` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GarageSize" AS ENUM ('one_car', 'two_car', 'three_car', 'oversized');

-- CreateEnum
CREATE TYPE "CoatingType" AS ENUM ('epoxy', 'polyaspartic', 'polyurea', 'metallic', 'quartz', 'not_sure');

-- CreateEnum
CREATE TYPE "FloorCondition" AS ENUM ('excellent', 'good', 'fair', 'poor');

-- CreateEnum
CREATE TYPE "CrackLevel" AS ENUM ('none', 'minor', 'several', 'major');

-- CreateEnum
CREATE TYPE "ExistingCoating" AS ENUM ('none', 'paint', 'epoxy');

-- CreateEnum
CREATE TYPE "DecorativeFinish" AS ENUM ('none', 'standard_flakes', 'premium_flakes');

-- CreateEnum
CREATE TYPE "Timeline" AS ENUM ('asap', 'within_month', 'within_three_months', 'flexible');

-- CreateEnum
CREATE TYPE "PreferredContactMethod" AS ENUM ('email', 'phone', 'text');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('detached', 'semi_detached', 'townhouse', 'commercial');

-- CreateEnum
CREATE TYPE "PreferredContactTime" AS ENUM ('morning', 'afternoon', 'evening', 'any');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ContractorStatus" AS ENUM ('ACTIVE', 'PAUSED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Calculation" DROP COLUMN "estimateHigh",
DROP COLUMN "estimateLow",
ADD COLUMN     "crackLevel" "CrackLevel" NOT NULL,
ADD COLUMN     "decorativeFinish" "DecorativeFinish" NOT NULL,
ADD COLUMN     "estimatedHigh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "estimatedLow" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "existingCoating" "ExistingCoating" NOT NULL,
ADD COLUMN     "moistureIssues" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recommendedSystem" TEXT NOT NULL,
ADD COLUMN     "squareFeet" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stemWalls" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stepsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timeline" "Timeline" NOT NULL,
DROP COLUMN "coatingType",
ADD COLUMN     "coatingType" "CoatingType" NOT NULL,
DROP COLUMN "garageSize",
ADD COLUMN     "garageSize" "GarageSize" NOT NULL,
DROP COLUMN "floorCondition",
ADD COLUMN     "floorCondition" "FloorCondition" NOT NULL;

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "city",
DROP COLUMN "coatingType",
DROP COLUMN "estimatedHigh",
DROP COLUMN "estimatedLow",
DROP COLUMN "garageSize",
ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "calculationId" TEXT NOT NULL,
ADD COLUMN     "garageEmpty" BOOLEAN NOT NULL,
ADD COLUMN     "internalNotes" TEXT,
ADD COLUMN     "preferredContactMethod" "PreferredContactMethod" NOT NULL,
ADD COLUMN     "preferredContactTime" "PreferredContactTime" NOT NULL,
ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
ADD COLUMN     "referenceNumber" TEXT NOT NULL,
ADD COLUMN     "saleValue" DOUBLE PRECISION,
ADD COLUMN     "soldAt" TIMESTAMP(3),
ADD COLUMN     "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Contractor" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "cities" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "leadPrice" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "status" "ContractorStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportedCity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupportedCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessSetting" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "defaultLeadPrice" DOUBLE PRECISION NOT NULL,
    "leadPricingMessage" TEXT,
    "supportEmail" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SupportedCity_name_key" ON "SupportedCity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_referenceNumber_key" ON "Lead"("referenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_calculationId_key" ON "Lead"("calculationId");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
