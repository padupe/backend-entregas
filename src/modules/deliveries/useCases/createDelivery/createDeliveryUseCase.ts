import { prisma } from "@database/prismaClient";
import { AppError } from "@shared/errors/appError";

interface ICreateDelivery {
    item_name: string;
    id_customer: string;
};

interface IResponseDelivery {
    id: string;
    item: string;
    customer: Object;
}

export class CreateDeliveryUseCase {

    async execute({ item_name, id_customer }: ICreateDelivery): Promise<IResponseDelivery> {

        const customerDelivery = await prisma.customers.findUnique({
            where: {
                id: id_customer
            }
        });

        if(!customerDelivery){
            throw new AppError("User not found!", 404);
        };

        const newDelivery = await prisma.deliveries.create({
            data: {
                item_name,
                id_customer
            },
            include: {
                customer: true
            }
        });
        
        return {
            id: newDelivery.id,
            item: newDelivery.item_name,
            customer: {
                username: customerDelivery?.username,
                id: newDelivery.id_customer
            }
        }
    };
};