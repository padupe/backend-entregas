import { prisma } from "../../../../database/prismaClient";
import { DeliverymanDefault } from "../../../../database/seed";
import { AppError } from "../../../../shared/errors/appError";
import { FindOneDeliverymanUseCase } from "./findOneDeliverymanUseCase";

const findOneDeliveryman = new FindOneDeliverymanUseCase();

describe("Find one Deliveryman by ID", () => {

    it("Should be able to show a Deliveryman by ID", async () => {

        let deliverymanBase = await prisma.deliverymans.findFirst({
            select: {
                id: true
            }
        });

        let result = await findOneDeliveryman.execute({
            //@ts-ignore
            id_deliveryman: deliverymanBase?.id
        });

        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('deliveryman');
    });

    it("Should not be able to find one Deliveryman by invalid ID", async () => {

        await expect(findOneDeliveryman.execute({
            id_deliveryman: "failed"
        })).rejects.toEqual(new AppError("Deliveryman not found!"))
    });
})