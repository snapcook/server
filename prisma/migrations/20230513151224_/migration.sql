/*
  Warnings:

  - You are about to drop the column `steps` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "steps";

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipeToStep" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Step_order_key" ON "Step"("order");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToStep_AB_unique" ON "_RecipeToStep"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToStep_B_index" ON "_RecipeToStep"("B");

-- AddForeignKey
ALTER TABLE "_RecipeToStep" ADD CONSTRAINT "_RecipeToStep_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToStep" ADD CONSTRAINT "_RecipeToStep_B_fkey" FOREIGN KEY ("B") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;
