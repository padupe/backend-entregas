import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliverymansUseCase {

    async execute(){

        const deliverymans = await prisma.deliverymans.findMany({
            select: {
                id: true,
                email: true,
                username: true
            }
        })

        console.log(deliverymans)
        return deliverymans
    }
}