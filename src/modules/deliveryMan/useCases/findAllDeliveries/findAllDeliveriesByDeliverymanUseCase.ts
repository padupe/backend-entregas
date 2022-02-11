import { prisma } from "../../../../database/prismaClient"

export class FindAllDeliveriesByDeliverymanUseCase {

    async execute( id_deliveryman: string ) {

        const deliveries = await prisma.deliverymans.findUnique({
            where: {
                id: id_deliveryman
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