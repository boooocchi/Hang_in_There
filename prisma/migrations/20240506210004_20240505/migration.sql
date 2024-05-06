/*
  Warnings:

  - The values [GREY] on the enum `Colors` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `LimitEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LimitEntry` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Piece` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Piece` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,category]` on the table `LimitEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemName` to the `Piece` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Colors_new" AS ENUM ('BLACK', 'WHITE', 'GRAY', 'BROWN', 'BEIGE', 'RED', 'BLUE', 'YELLOW', 'GREEN', 'ORANGE', 'PURPLE', 'PINK', 'GOLD', 'SILVER', 'BRONZE');
ALTER TABLE "Piece" ALTER COLUMN "color" TYPE "Colors_new" USING ("color"::text::"Colors_new");
ALTER TYPE "Colors" RENAME TO "Colors_old";
ALTER TYPE "Colors_new" RENAME TO "Colors";
DROP TYPE "Colors_old";
COMMIT;

-- AlterTable
ALTER TABLE "LimitEntry" DROP CONSTRAINT "LimitEntry_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Piece" DROP COLUMN "location",
DROP COLUMN "title",
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "itemName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LimitEntry_userId_category_key" ON "LimitEntry"("userId", "category");
