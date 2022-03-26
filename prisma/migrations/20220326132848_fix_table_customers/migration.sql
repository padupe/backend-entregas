/*
  Warnings:

  - You are about to drop the column `id_client` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_customer` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_id_client_fkey";

-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "id_client",
ADD COLUMN     "id_customer" TEXT NOT NULL;

-- DropTable
DROP TABLE "clients";

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "profile_type" INTEGER NOT NULL DEFAULT 2,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_username_key" ON "customers"("username");

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
