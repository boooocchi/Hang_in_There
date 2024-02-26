/*
  Warnings:

  - Made the column `imageUrl` on table `Piece` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "Colors" ADD VALUE 'BEIGE';

-- AlterTable
ALTER TABLE "DendoOutfit" ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Piece" ALTER COLUMN "imageUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "WishList" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "itemName" TEXT NOT NULL,
    "category" "Categories" NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
