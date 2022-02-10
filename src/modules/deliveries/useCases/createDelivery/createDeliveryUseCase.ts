import { prisma } from "../../../../database/prismaClient";

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

        const newDelivery = await prisma.deliveries.create({
            data: {
                item_name,
                id_client
            },
            include: {
                client: true
            }
        });

        const clientDelivery = await prisma.clients.findUnique({
            where: {
                id: id_client
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