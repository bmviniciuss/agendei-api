/*
  Warnings:

  - You are about to drop the `Day` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_createdById_fkey";

-- DropTable
DROP TABLE "Day";
