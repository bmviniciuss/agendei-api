/*
  Warnings:

  - You are about to drop the column `dayId` on the `Slot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_dayId_fkey";

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "dayId";
