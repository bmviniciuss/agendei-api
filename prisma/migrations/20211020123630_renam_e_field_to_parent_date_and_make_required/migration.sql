/*
  Warnings:

  - You are about to drop the column `originalDate` on the `EventInstance` table. All the data in the column will be lost.
  - Added the required column `parentDate` to the `EventInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventInstance" DROP COLUMN "originalDate",
ADD COLUMN     "parentDate" TIMESTAMP(3) NOT NULL;
