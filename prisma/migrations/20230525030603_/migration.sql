/*
  Warnings:

  - You are about to drop the column `utensils` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `photo` to the `Utensil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "utensils";

-- AlterTable
ALTER TABLE "Utensil" ADD COLUMN     "photo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RecipeUtensil" (
    "recipeId" TEXT NOT NULL,
    "utensilId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "RecipeUtensil_pkey" PRIMARY KEY ("recipeId","utensilId")
);

-- AddForeignKey
ALTER TABLE "RecipeUtensil" ADD CONSTRAINT "RecipeUtensil_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUtensil" ADD CONSTRAINT "RecipeUtensil_utensilId_fkey" FOREIGN KEY ("utensilId") REFERENCES "Utensil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
