import { prisma } from "@database/prismaClient"
import { AppError } from "@shared/errors/appError"

export class FindAllDeliveriesByCustomerUseCase {

    async execute(id_customer: string) {

        const deliveries = await prisma.customers.findUnique({
            where: {
                id: id_customer
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