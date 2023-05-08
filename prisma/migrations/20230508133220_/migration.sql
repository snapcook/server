/*
  Warnings:

  - You are about to drop the `RecipeSecondCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShoppingNotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_secondCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingNotes" DROP CONSTRAINT "ShoppingNotes_authorId_fkey";

-- DropTable
DROP TABLE "RecipeSecondCategory";

-- DropTable
DROP TABLE "ShoppingNotes";

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingNote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ShoppingNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCategory_name_key" ON "RecipeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCategory_slug_key" ON "RecipeCategory"("slug");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_secondCategoryId_fkey" FOREIGN KEY ("secondCategoryId") REFERENCES "RecipeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingNote" ADD CONSTRAINT "ShoppingNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
