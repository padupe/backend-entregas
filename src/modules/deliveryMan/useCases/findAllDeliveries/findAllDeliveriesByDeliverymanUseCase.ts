import { prisma } from "@database/prismaClient"
import { AppError } from "@shared/errors/appError"

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

        if(deliveries == null) {
            throw new AppError("You are not allowed to perform this query.", 409)
        }

        return deliveries
    }
}