import { prisma } from "@database/prismaClient";

export class FindAllDeliveriesAvailableUseCase {

    async execute() {

        const deliveries = await prisma.deliveries.findMany({
            where: {
                end_date: null,
                id_deliveryman: null
            },
            select: {
                id: true,
                item_name: true,
                created_at: true,
                customer: {
                    select: {
                        username: true,
                    }
                }
            },
        })

        return deliveries;
    }
};