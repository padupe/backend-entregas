import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesAvailableUseCase {

    async execute() {

        const deliveries = await prisma.deliveries.findMany({
            where: {
                end_date: null
            },
            select: {
                id: true,
                item_name: true,
                created_at: true,
                client: {
                    select: {
                        username: true,
                    }
                }
            },
        })

        return deliveries;
    }
};