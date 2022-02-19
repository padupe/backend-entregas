import { prisma } from "../../../../database/prismaClient";
import { FindAllDeliverymansUseCase } from "./findAllDeliverymansUseCase";

const findAllDeliverymans = new FindAllDeliverymansUseCase();

describe("List all Deliverymans registered on App", () => {

    it("Should be able to list all Deliverymans", async () => {

        let result = await findAllDeliverymans.execute();
        let deliverymans = await prisma.deliverymans.findMany({});

        expect(result).toHaveLength(deliverymans.length);
        expect(deliverymans).toHaveLength(result.length);
    });

    it("Should not be able to list all Deliverymans", async () => {

        let result = await findAllDeliverymans.execute();
        let deliverymans = await prisma.deliverymans.findMany({});

        expect(result).not.toHaveLength(deliverymans.length-1);
        expect(result).not.toHaveLength(0);
        expect(result).not.toHaveLength(deliverymans.length+1);
        expect(deliverymans).not.toHaveLength(result.length-1);
        expect(deliverymans).not.toHaveLength(0);
        expect(deliverymans).not.toHaveLength(result.length+1);
    });
})