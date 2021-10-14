/*
  Warnings:

  - Added the required column `clientsPerSlot` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "clientsPerSlot" INTEGER NOT NULL;
