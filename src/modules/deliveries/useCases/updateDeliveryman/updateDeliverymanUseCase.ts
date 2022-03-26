import { prisma } from "@database/prismaClient";
import { AppError } from "@shared/errors/appError";


interface IUpdateDeliveryman {
    id_delivery: string;
    id_deliveryman: string;
}

interface IResponseUpdateDeliveryman {
    id_delivery: string;
    item: string;
    customer: string;
    deliveryman?: string;
}

export class UpdateDeliverymanUseCase {

    async execute({ id_delivery, id_deliveryman }:IUpdateDeliveryman): Promise<IResponseUpdateDeliveryman>  {

        const findDelivery = await prisma.deliveries.findUnique({
            where: {
                id: id_delivery
            }
        })

        if(!findDelivery) {
            throw new AppError("Delivery not found!")
        }

        const result = await prisma.deliveries.update({
            where: {
                id: id_delivery
            },
            data: {
                id_deliveryman
            },
            select: {
                id: true,
                item_name: true,
                created_at: true,
                customer: {
                    select: {
                        username: true,
                    }
                },
                deliveryman: {
                    select: {
                        username: true
                    }
                }
            },
        });

        return {
            id_delivery,
            item: result.item_name,
            customer: result.customer.username,
            deliveryman: result.deliveryman?.username
        }
    }
};