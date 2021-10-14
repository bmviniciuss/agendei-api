/*
  Warnings:

  - Added the required column `limit` to the `SpaceRuleSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SpaceRuleSet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RuleSetTypeEnum" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "SpaceRuleSet" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "limit" INTEGER NOT NULL,
ADD COLUMN     "type" "RuleSetTypeEnum" NOT NULL DEFAULT E'DAILY',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
