import { prisma } from "@database/prismaClient";
import { AppError } from "@shared/errors/appError";
import { CreateDeliveryUseCase } from "./createDeliveryUseCase";

const createDelivery = new CreateDeliveryUseCase();

describe("Create a Delivery", () => {

    it("Should be able to create a Delivery", async () => {

        let customerBase = await prisma.customers.findFirst({
            select: {
                id: true
            }
        })

        let delivery = await createDelivery.execute({
            item_name: "Delivery Test",
            //@ts-ignore
            id_customer: customerBase?.id
        })

        expect(delivery).toHaveProperty('id');
        expect(delivery).toHaveProperty('item');
        expect(delivery).toHaveProperty('customer');
    });

    it("Should not be able to create a Delivery with a non existent customer", async () => {

        await expect(createDelivery.execute({
            id_customer: "failed",
            item_name: "Delivery Failed"
        })).rejects.toEqual(new AppError("User not found!", 404))
    });
})