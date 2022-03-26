import { prisma } from "@database/prismaClient";

export class FindAllCustomersUseCase {

    async execute() {

        const customers = await prisma.customers.findMany({
            select: {
                id: true,
                email: true,
                username: true
            }
        })

        return customers;
    }
}