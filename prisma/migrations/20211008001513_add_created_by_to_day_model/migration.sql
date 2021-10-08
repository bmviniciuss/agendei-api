/*
  Warnings:

  - Added the required column `createdById` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
