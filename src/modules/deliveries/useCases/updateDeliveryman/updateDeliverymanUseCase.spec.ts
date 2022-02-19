import { prisma } from "../../../../database/prismaClient";
import { DeliverymanDefault } from "../../../../database/seed";
import { AppError } from "../../../../shared/errors/appError";
import { UpdateDeliverymanUseCase } from "./updateDeliverymanUseCase";

const updateDeliveryman = new UpdateDeliverymanUseCase();

describe("Update Deliveryman on available delivery", () => {

    it("Should be able to update deliveryman on available delivery", async () => {

        let deliveryBase = await prisma.deliveries.findFirst({
            where: {
                end_date: null,
                id_deliveryman: null
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

        let result = await updateDeliveryman.execute({
            //@ts-ignore
            id_delivery: deliveryBase?.id,
            //@ts-ignore
            id_deliveryman: deliverymanBase?.id
        });

        expect(result).toHaveProperty('id_delivery');
        expect(result).toHaveProperty('item');
        expect(result).toHaveProperty('client');
        expect(result).toHaveProperty('deliveryman');
    });

    it("Should not be able to update deliveryman on available delivery with a non existent delivery ID", async () => {

        let deliverymanBase = await prisma.deliverymans.findUnique({
            where: {
                username: DeliverymanDefault.username
            },
            select: {
                id: true
            }
        });

        await expect(updateDeliveryman.execute({
            id_delivery: "failed",
            //@ts-ignore
            id_deliveryman: deliverymanBase?.id
        })).rejects.toEqual(new AppError("Delivery not found!"))
    });
})