import { prisma } from "@database/prismaClient";
import { clearDataBase, DeliverymanDefault, DeliverymanFailure, populateDataBase } from "@database/seed";
import { AppError } from "../../../../shared/errors/appError";
import { UpdateDeliverymanUseCase } from "../updateDeliveryman/updateDeliverymanUseCase";
import { UpdateEndDateUseCase } from "./updateEndDateUsecase";

const updateDeliveryman = new UpdateDeliverymanUseCase();
const updateEndDate = new UpdateEndDateUseCase();

describe("Update end date on a delivery", () => {

    it("Should be able to update end date on a delivery", async () => {

        let deliverymanBase = await prisma.deliverymans.findUnique({
            where: {
                username: DeliverymanDefault.username
            },
            select: {
                id: true
            }
        });

        let deliveryBase = await prisma.deliveries.findFirst({
            where: {
                end_date: null,
                id_deliveryman: deliverymanBase?.id
            }
        });

        let result = await updateEndDate.execute({
            //@ts-ignore
            id_delivery: deliveryBase?.id,
            //@ts-ignore
            id_deliveryman: deliverymanBase?.id
        });

        expect(result).toHaveProperty('id_delivery');
        expect(result).toHaveProperty('customer');
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

    it("Should not be able to update end date on a delivery with a deliveryman not authorized", async () => {

        let derymanFailure = await prisma.deliverymans.findUnique({
            where: {
                email: DeliverymanFailure.email
            }
        })

        let deliverymanBase = await prisma.deliverymans.findUnique({
            where: {
                username: DeliverymanDefault.username
            },
            select: {
                id: true
            }
        });
        
        let deliveryBase = await prisma.deliveries.findFirst({
            where: {
                end_date: null,
                id_deliveryman: deliverymanBase?.id
            }
        });

        let id_delivery = String(deliveryBase?.id)

        await expect(updateEndDate.execute({
            id_delivery,
            //@ts-ignore
            id_deliveryman: derymanFailure?.id
        })).rejects.toEqual(new AppError("Deliveryman is not responsible for delivery", 406))
    })
})