/*
  Warnings:

  - You are about to drop the column `searchMainIngredients` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "searchMainIngredients",
ADD COLUMN     "fullIngredients" TEXT[],
ADD COLUMN     "searchIngredients" TEXT NOT NULL DEFAULT '';
