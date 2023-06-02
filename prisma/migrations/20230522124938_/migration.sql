/*
  Warnings:

  - Added the required column `photo` to the `RecipeCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeCategory" ADD COLUMN     "photo" TEXT NOT NULL;
