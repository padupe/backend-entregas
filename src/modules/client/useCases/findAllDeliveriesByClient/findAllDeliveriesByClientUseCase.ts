import { prisma } from "../../../../database/prismaClient"

export class FindAllDeliveriesByClientUseCase {

    async execute(id_client: string) {

        const deliveries = await prisma.clients.findUnique({
            where: {
                id: id_client
            },
            select: {
                id: true,
                username: true,
                deliveries: {
                    select: {
                        id: true,
                        item_name: true,
                        created_at: true,
                    }
                }
            }           
        })

        return deliveries
    }
}