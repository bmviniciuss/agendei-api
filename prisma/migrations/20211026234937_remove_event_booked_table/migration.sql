/*
  Warnings:

  - You are about to drop the `EventBooked` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventBooked" DROP CONSTRAINT "EventBooked_eventDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "EventBooked" DROP CONSTRAINT "EventBooked_parentId_fkey";

-- DropTable
DROP TABLE "EventBooked";
