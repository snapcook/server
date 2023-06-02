-- DropForeignKey
ALTER TABLE "RecipeUtensil" DROP CONSTRAINT "RecipeUtensil_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "RecipeUtensil" ADD CONSTRAINT "RecipeUtensil_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
