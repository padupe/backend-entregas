import { prisma } from "@database/prismaClient";
import { AppError } from "../../../../shared/errors/appError";

interface IUpdateEndDate {
    id_delivery: string;
    id_deliveryman: string;
}

interface IResponseUpdateEndDate {
    id_delivery: string;
    customer: string;
    item: string;
    created_at: Date;
    end_date?: Date;
    deliveryman?: string;
}

export class UpdateEndDateUseCase {

    async execute({ id_delivery, id_deliveryman }:IUpdateEndDate): Promise<IResponseUpdateEndDate> {

        const findDelivery = await prisma.deliveries.findUnique({
            where: {
                id: id_delivery
            }
        })

        if(!findDelivery) {
            throw new AppError("Delivery not found!")
        }

        if(findDelivery.id_deliveryman != id_deliveryman) {
            throw new AppError("Deliveryman is not responsible for delivery", 406)
        }

        const update = await prisma.deliveries.update({
            where: {
                id: id_delivery
            },
            data: {
                end_date: new Date()
            },
            select: {
                id: true,
                item_name: true,
                created_at: true,
                end_date: true,
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
            customer: update.customer.username,
            item: update.item_name,
            created_at: update.created_at,
            //@ts-ignore
            end_date: update.end_date,            
            deliveryman: update.deliveryman?.username
        };
    }
}