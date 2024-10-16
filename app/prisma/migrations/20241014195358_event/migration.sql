/*
  Warnings:

  - You are about to drop the column `clubId` on the `Wine` table. All the data in the column will be lost.
  - The primary key for the `WineClub` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Wine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tastingId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_wineId_fkey";

-- DropForeignKey
ALTER TABLE "Wine" DROP CONSTRAINT "Wine_clubId_fkey";

-- DropForeignKey
ALTER TABLE "_clubMembers" DROP CONSTRAINT "_clubMembers_B_fkey";

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "tastingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wine" DROP COLUMN "clubId",
ADD COLUMN     "year" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WineClub" DROP CONSTRAINT "WineClub_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "WineClub_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WineClub_id_seq";

-- AlterTable
ALTER TABLE "_clubMembers" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wineClubId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasting" (
    "id" TEXT NOT NULL,
    "wineId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "wineClubId" TEXT NOT NULL,

    CONSTRAINT "Tasting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_signUps" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_signUps_AB_unique" ON "_signUps"("A", "B");

-- CreateIndex
CREATE INDEX "_signUps_B_index" ON "_signUps"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Wine_name_key" ON "Wine"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_wineClubId_fkey" FOREIGN KEY ("wineClubId") REFERENCES "WineClub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasting" ADD CONSTRAINT "Tasting_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "Wine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasting" ADD CONSTRAINT "Tasting_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasting" ADD CONSTRAINT "Tasting_wineClubId_fkey" FOREIGN KEY ("wineClubId") REFERENCES "WineClub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_tastingId_fkey" FOREIGN KEY ("tastingId") REFERENCES "Tasting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_signUps" ADD CONSTRAINT "_signUps_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_signUps" ADD CONSTRAINT "_signUps_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_clubMembers" ADD CONSTRAINT "_clubMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "WineClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;
