import { prisma } from "@database/prismaClient";
import { CustomersRepository } from "@modules/customer/infra/prisma/repositories/CustomersRepository";
import { AppError } from "@shared/errors/appError";
import { FindOneCustomerUseCase } from "./findOneCustomerUseCase";

let findOneCustomerUseCase: FindOneCustomerUseCase
let customersRepository: CustomersRepository

describe("Find one Client by ID", () => {

    beforeEach(() => {
        customersRepository = new CustomersRepository()
        findOneCustomerUseCase = new FindOneCustomerUseCase(customersRepository)
    })

    it("Shoul be able to find one client with successfull", async () => {

        let customerBase = await prisma.customers.findFirst({
            select: {
                id: true
            }
        });

        let result = await findOneCustomerUseCase.execute({
            //@ts-ignore
            id_customer: customerBase?.id
        });

        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('customer');
    });

    it("Should not be able to find one customer by invalid ID", async () => {

        await expect(findOneCustomerUseCase.execute({
            id_customer: "failed"
        })).rejects.toEqual(new AppError("Customer not found!"))
    });
})