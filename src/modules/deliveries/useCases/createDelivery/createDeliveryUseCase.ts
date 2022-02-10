import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../shared/errors/appError";

interface ICreateDelivery {
    item_name: string;
    id_client: string;
};

interface IResponseDelivery {
    id: string;
    item: string;
    client: Object;
}

export class CreateDeliveryUseCase {

    async execute({ item_name, id_client }: ICreateDelivery): Promise<IResponseDelivery> {

        const clientDelivery = await prisma.clients.findUnique({
            where: {
                id: id_client
            }
        });

        if(!clientDelivery){
            throw new AppError("User not found!", 404);
        };

        const newDelivery = await prisma.deliveries.create({
            data: {
                item_name,
                id_client
            },
            include: {
                client: true
            }
        });
        
        return {
            id: newDelivery.id,
            item: newDelivery.item_name,
            client: {
                username: clientDelivery?.username,
                id: newDelivery.id_client
            }
        }
    };
};