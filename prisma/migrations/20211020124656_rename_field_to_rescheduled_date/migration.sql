/*
  Warnings:

  - You are about to drop the column `parentDate` on the `EventInstance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventInstance" DROP COLUMN "parentDate",
ADD COLUMN     "rescheduledDate" TIMESTAMP(3);
