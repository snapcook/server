/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Bookmarks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recipeId]` on the table `Bookmarks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[secondCategoryId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `ShoppingNote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookmarks_authorId_key" ON "Bookmarks"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmarks_recipeId_key" ON "Bookmarks"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_secondCategoryId_key" ON "Recipe"("secondCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_authorId_key" ON "Recipe"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingNote_authorId_key" ON "ShoppingNote"("authorId");
