/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_name_key" ON "profiles"("name");
