import { prisma } from "../../../../database/prismaClient"
import { AppError } from "../../../../shared/errors/appError"

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

        if(deliveries == null) {
            throw new AppError("You are not allowed to perform this query.", 409)
        }

        return deliveries
    }
}