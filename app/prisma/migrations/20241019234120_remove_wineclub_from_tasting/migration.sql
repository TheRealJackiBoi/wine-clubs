/*
  Warnings:

  - You are about to drop the column `wineClubId` on the `Tasting` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tasting" DROP CONSTRAINT "Tasting_wineClubId_fkey";

-- AlterTable
ALTER TABLE "Tasting" DROP COLUMN "wineClubId";
