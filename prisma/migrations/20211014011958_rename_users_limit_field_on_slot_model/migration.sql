/*
  Warnings:

  - You are about to drop the column `usersLimit` on the `Slot` table. All the data in the column will be lost.
  - Added the required column `numberOfClientsLimit` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "usersLimit",
ADD COLUMN     "numberOfClientsLimit" INTEGER NOT NULL;
