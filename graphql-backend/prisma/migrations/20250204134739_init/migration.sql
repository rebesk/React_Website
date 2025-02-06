-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grocery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Grocery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Grocery" ADD CONSTRAINT "Grocery_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
