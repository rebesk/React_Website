/*
  Warnings:

  - Changed the type of `measurementType` on the `Measurement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('GRAMS', 'LITERS', 'DECILITERS', 'TABLESPOONS', 'TEASPOONS', 'PIECES');

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_measurementId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "measurementId" DROP NOT NULL,
ALTER COLUMN "recipeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Measurement" DROP COLUMN "measurementType",
ADD COLUMN     "measurementType" "MeasurementType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "Measurement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
