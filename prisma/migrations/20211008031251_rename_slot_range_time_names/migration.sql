/*
  Warnings:

  - You are about to drop the column `end` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Slot` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
