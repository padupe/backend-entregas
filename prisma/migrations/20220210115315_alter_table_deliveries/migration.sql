-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_id_deliveryman_fkey";

-- AlterTable
ALTER TABLE "deliveries" ALTER COLUMN "id_deliveryman" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliverymans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
