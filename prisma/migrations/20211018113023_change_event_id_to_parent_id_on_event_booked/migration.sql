/*
  Warnings:

  - You are about to drop the column `eventId` on the `EventBooked` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentId,date]` on the table `EventBooked` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentId` to the `EventBooked` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventBooked" DROP CONSTRAINT "EventBooked_eventId_fkey";

-- DropIndex
DROP INDEX "EventBooked_eventId_date_key";

-- AlterTable
ALTER TABLE "EventBooked" DROP COLUMN "eventId",
ADD COLUMN     "parentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EventBooked_parentId_date_key" ON "EventBooked"("parentId", "date");

-- AddForeignKey
ALTER TABLE "EventBooked" ADD CONSTRAINT "EventBooked_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
