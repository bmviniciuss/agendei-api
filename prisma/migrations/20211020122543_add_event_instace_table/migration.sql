/*
  Warnings:

  - Added the required column `eventInstanceId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventInstaceTypeEnum" AS ENUM ('BOOKING', 'RESCHEDULE', 'CANCELLATION');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "eventInstanceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "EventInstance" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "originalDate" TIMESTAMP(3),
    "date" TIMESTAMP(3) NOT NULL,
    "eventDetailsId" TEXT NOT NULL,
    "type" "EventInstaceTypeEnum" NOT NULL DEFAULT E'BOOKING',
    "isCanceled" BOOLEAN NOT NULL DEFAULT false,
    "isRescheduled" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventInstance_eventDetailsId_key" ON "EventInstance"("eventDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "EventInstance_parentId_date_key" ON "EventInstance"("parentId", "date");

-- AddForeignKey
ALTER TABLE "EventInstance" ADD CONSTRAINT "EventInstance_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInstance" ADD CONSTRAINT "EventInstance_eventDetailsId_fkey" FOREIGN KEY ("eventDetailsId") REFERENCES "EventDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventInstanceId_fkey" FOREIGN KEY ("eventInstanceId") REFERENCES "EventInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
