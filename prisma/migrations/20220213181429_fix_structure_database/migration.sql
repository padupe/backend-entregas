/*
  Warnings:

  - You are about to drop the column `profile_id` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `deliverymans` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "deliverymans" DROP CONSTRAINT "deliverymans_profile_id_fkey";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "profile_id",
ADD COLUMN     "profile_type" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "profile_id",
ADD COLUMN     "profile_type" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "deliverymans" DROP COLUMN "profile_id",
ADD COLUMN     "profile_type" INTEGER NOT NULL DEFAULT 3;
