import { prisma } from "@database/prismaClient";
import { DeliverymanDefault } from "@database/seed";
import { AppError } from "@shared/errors/appError";
import { FindAllDeliveriesByDeliverymanUseCase } from "./findAllDeliveriesByDeliverymanUseCase";

const findAllDeliveriesByDeliveryman = new FindAllDeliveriesByDeliverymanUseCase();

describe("Find all deliveries by ID Deliveryman", () => {

    it("Should be able to list all deliveries by Deliveryman with successfull", async () => {

        let deliverymanBase = await prisma.deliverymans.findUnique({
            where: {
                username: DeliverymanDefault.username
            },
            select: {
                id: true,
                deliveries: true
            }
        })

        let deliveries = deliverymanBase?.deliveries;
        let id_deliveryman = String(deliverymanBase?.id);

        let result = await findAllDeliveriesByDeliveryman.execute(id_deliveryman);

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('username');
        expect(result).toHaveProperty('deliveries');
        //@ts-ignore
        expect(result.deliveries).toHaveLength(deliveries?.length);
    });

    it("Should not be able to find all deliveries by invalid Deliveryman ID", async () => {

        await expect(findAllDeliveriesByDeliveryman.execute("failed"))
            .rejects.toEqual(new AppError("You are not allowed to perform this query.", 409))
    });
})