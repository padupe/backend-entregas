import { prisma } from "@database/prismaClient";
import { CustomersRepository } from "@modules/customer/infra/prisma/repositories/CustomersRepository";
import { FindAllCustomersUseCase } from "./findAllCustomersUseCase";

let findAllCustomersUseCase: FindAllCustomersUseCase
let customersRepository: CustomersRepository

describe("List all Customers registered on App", () => {

    beforeEach(()=> {
        customersRepository = new CustomersRepository()
        findAllCustomersUseCase = new FindAllCustomersUseCase(customersRepository)
    })

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