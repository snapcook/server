-- CreateEnum
CREATE TYPE "RecipeMainCategory" AS ENUM ('Makanan', 'Minuman');

-- CreateTable
CREATE TABLE "RecipeSecondCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "RecipeSecondCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mainCategory" "RecipeMainCategory" NOT NULL,
    "secondCategoryId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "totalServing" INTEGER NOT NULL,
    "mainIngredient" TEXT[],
    "spices" TEXT[],
    "utensils" TEXT[],
    "estimatedTime" INTEGER NOT NULL,
    "step" TEXT NOT NULL,
    "fullContent" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeSecondCategory_name_key" ON "RecipeSecondCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeSecondCategory_slug_key" ON "RecipeSecondCategory"("slug");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_secondCategoryId_fkey" FOREIGN KEY ("secondCategoryId") REFERENCES "RecipeSecondCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
