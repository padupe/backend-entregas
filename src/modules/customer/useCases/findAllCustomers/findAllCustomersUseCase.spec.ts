import { prisma } from "@database/prismaClient";
import { FindAllCustomersUseCase } from "./findAllCustomersUseCase";

const findAllCustomersUseCase = new FindAllCustomersUseCase();

describe("List all Customers registered on App", () => {

    it("Should be able to list all Customers", async () => {

        let result = await findAllCustomersUseCase.execute();
        let customers = await prisma.customers.findMany({});

        expect(result).toHaveLength(customers.length);
        expect(customers).toHaveLength(result.length);
    });
    
    it("Should not be able to list all Customers", async () => {

        let result = await findAllCustomersUseCase.execute();
        let customers = await prisma.customers.findMany({});

        expect(result).not.toHaveLength(customers.length-1);
        expect(result).not.toHaveLength(0);
        expect(result).not.toHaveLength(customers.length+1);
        expect(customers).not.toHaveLength(result.length-1);
        expect(customers).not.toHaveLength(0);
        expect(customers).not.toHaveLength(result.length+1);
    });
})