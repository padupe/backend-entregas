import { prisma } from "../../../../database/prismaClient";
import { DeliverymanDefault } from "../../../../database/seed";
import { UpdateDeliverymanUseCase } from "./updateDeliverymanUseCase";

const updateDeliveryman = new UpdateDeliverymanUseCase();

describe("Update Deliveryman on available delivery", () => {

    it("Should be able to update deliveryman on availabel delivery", async () => {

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

        console.log(result)

        expect(result).toHaveProperty('id_delivery')
    })
})