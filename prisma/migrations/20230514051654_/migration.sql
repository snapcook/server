/*
  Warnings:

  - You are about to drop the `Step` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecipeToStep` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RecipeToStep" DROP CONSTRAINT "_RecipeToStep_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToStep" DROP CONSTRAINT "_RecipeToStep_B_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "steps" TEXT[];

-- DropTable
DROP TABLE "Step";

-- DropTable
DROP TABLE "_RecipeToStep";
