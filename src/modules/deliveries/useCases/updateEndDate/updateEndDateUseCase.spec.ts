import { prisma } from "../../../../database/prismaClient";
import { clearDataBase, DeliverymanDefault, populateDataBase } from "../../../../database/seed";
import { AppError } from "../../../../shared/errors/appError";
import { UpdateDeliverymanUseCase } from "../updateDeliveryman/updateDeliverymanUseCase";
import { UpdateEndDateUseCase } from "./updateEndDateUsecase";

const updateDeliveryman = new UpdateDeliverymanUseCase();
const updateEndDate = new UpdateEndDateUseCase();

describe("Update end date on a delivery", () => {

    it("Should be able to update end date on a delivery", async () => {

        //First Time: Setting deliveryman on a delivery available
        let deliveryUpdate = await prisma.deliveries.findFirst({
            where: {
                end_date: null,
                id_deliveryman: null
            }
        });

        let deliverymanUpdate = await prisma.deliverymans.findUnique({
            where: {
                username: DeliverymanDefault.username
            },
            select: {
                id: true
            }
        });

        let resultFaseOne = await updateDeliveryman.execute({
            //@ts-ignore
            id_delivery: deliveryUpdate?.id,
            //@ts-ignore
            id_deliveryman: deliverymanUpdate?.id
        });
        
        // Final Test
        let deliveryBase = await prisma.deliveries.findFirst({
            where: {
                end_date: null
            }
        });

        let deliverymanBase = await prisma.deliverymans.findUnique({
            where: {
                username: DeliverymanDefault.username
            },
            select: {
                id: true
            }
        });

        let result = await updateEndDate.execute({
            //@ts-ignore
            id_delivery: deliveryBase?.id,
            //@ts-ignore
            id_deliveryman: deliverymanBase?.id
        });

        expect(result).toHaveProperty('id_delivery');
        expect(result).toHaveProperty('client');
        expect(result).toHaveProperty('item');
        expect(result).toHaveProperty('created_at');
        expect(result).toHaveProperty('end_date');
        expect(result).toHaveProperty('deliveryman');
    });

    it("Should not be able to update end date on a delivery with a non existent delivery ID", async () => {

        let deliverymanBase = await prisma.deliverymans.findUnique({
            where: {
                username: DeliverymanDefault.username
            },
            select: {
                id: true
            }
        });

        await expect(updateEndDate.execute({
            id_delivery: "failed",
            //@ts-ignore
            id_deliveryman: deliverymanBase?.id
        })).rejects.toEqual(new AppError("Delivery not found!"))
    });
})