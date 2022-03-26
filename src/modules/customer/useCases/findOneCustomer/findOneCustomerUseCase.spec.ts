import { prisma } from "@database/prismaClient";
import { AppError } from "@shared/errors/appError";
import { FindOneCustomerUseCase } from "./findOneCustomerUseCase";

const findOneCustomerUseCase = new FindOneCustomerUseCase();

describe("Find one Client by ID", () => {

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