/*
  Warnings:

  - You are about to drop the `PinnedProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PinnedProduct" DROP CONSTRAINT "PinnedProduct_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pinPosition" INTEGER;

-- DropTable
DROP TABLE "PinnedProduct";
