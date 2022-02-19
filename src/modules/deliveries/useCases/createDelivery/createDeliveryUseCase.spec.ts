import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../shared/errors/appError";
import { CreateDeliveryUseCase } from "./createDeliveryUseCase";

const createDelivery = new CreateDeliveryUseCase();

describe("Create a Delivery", () => {

    it("Should be able to create a Delivery", async () => {

        let clienteBase = await prisma.clients.findFirst({
            select: {
                id: true
            }
        })

        let delivery = await createDelivery.execute({
            item_name: "Delivery Test",
            //@ts-ignore
            id_client: clienteBase?.id
        })

        expect(delivery).toHaveProperty('id');
        expect(delivery).toHaveProperty('item');
        expect(delivery).toHaveProperty('client');
    });

    it("Should not be able to create a Delivery with a non existent client", async () => {

        await expect(createDelivery.execute({
            id_client: "failed",
            item_name: "Delivery Failed"
        })).rejects.toEqual(new AppError("User not found!", 404))
    });
})