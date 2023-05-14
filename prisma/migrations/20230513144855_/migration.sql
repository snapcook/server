/*
  Warnings:

  - You are about to drop the column `fullContent` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `mainIngredient` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `step` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "fullContent",
DROP COLUMN "mainIngredient",
DROP COLUMN "step",
ADD COLUMN     "mainIngredients" TEXT[],
ADD COLUMN     "steps" TEXT[];
