/*
  Warnings:

  - Added the required column `profile_id` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `deliverymans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "deliverymans" ADD COLUMN     "profile_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_type_key" ON "profile"("type");

-- AddForeignKey
ALTER TABLE "deliverymans" ADD CONSTRAINT "deliverymans_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
