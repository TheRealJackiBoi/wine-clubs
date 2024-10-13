/*
  Warnings:

  - You are about to drop the `_UserToWineClub` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clubOwnerId` to the `WineClub` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "_UserToWineClub" DROP CONSTRAINT "_UserToWineClub_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWineClub" DROP CONSTRAINT "_UserToWineClub_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "WineClub" ADD COLUMN     "clubOwnerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserToWineClub";

-- CreateTable
CREATE TABLE "_clubMembers" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_clubMembers_AB_unique" ON "_clubMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_clubMembers_B_index" ON "_clubMembers"("B");

-- AddForeignKey
ALTER TABLE "WineClub" ADD CONSTRAINT "WineClub_clubOwnerId_fkey" FOREIGN KEY ("clubOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_clubMembers" ADD CONSTRAINT "_clubMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_clubMembers" ADD CONSTRAINT "_clubMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "WineClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;
