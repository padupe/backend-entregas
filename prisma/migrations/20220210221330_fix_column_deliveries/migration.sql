/*
  Warnings:

  - You are about to drop the column `updated_at` on the `deliveries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "updated_at",
ADD COLUMN     "end_date" TIMESTAMP(3);
