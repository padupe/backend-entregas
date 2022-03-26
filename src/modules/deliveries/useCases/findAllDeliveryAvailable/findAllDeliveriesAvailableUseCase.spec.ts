import { prisma } from "@database/prismaClient";
import { FindAllDeliveriesAvailableUseCase } from "./findAllDeliveriesAvailableUseCase";

const findAllDeliveriesAvailable = new FindAllDeliveriesAvailableUseCase();

describe ("Find all Deliveries available", () => {

    it("Should be able to list all deliveries available", async () => {

        let result = await findAllDeliveriesAvailable.execute();
        let deliveriesAvailable = await prisma.deliveries.findMany({
            where: {
                end_date: null,
                id_deliveryman: null
            }
        })

        expect(result).toHaveLength(deliveriesAvailable.length);
        expect(deliveriesAvailable).toHaveLength(result.length)
    });

    it("Should not be able to list all deliveries available", async () => {

        let result = await findAllDeliveriesAvailable.execute();
        let deliveriesAvailable = await prisma.deliveries.findMany({
            where: {
                end_date: null,
                id_deliveryman: null
            }
        })

        expect(result).not.toHaveLength(deliveriesAvailable.length-1);
        expect(result).not.toHaveLength(0);
        expect(result).not.toHaveLength(deliveriesAvailable.length+1);
        expect(deliveriesAvailable).not.toHaveLength(result.length-1);
        expect(deliveriesAvailable).not.toHaveLength(0);
        expect(deliveriesAvailable).not.toHaveLength(result.length+1);
    });
})