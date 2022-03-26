import { prisma } from "@database/prismaClient";
import { customerDefault } from "@database/seed";
import { AppError } from "@shared/errors/appError";
import { FindAllDeliveriesByCustomerUseCase } from "./findAllDeliveriesByCustomerUseCase";

const findAllDeliveriesByCustomer = new FindAllDeliveriesByCustomerUseCase();

describe("Find all deliveries by ID Customer", () => {

    it("Should be able to list all deliveries by Customer with successfull", async () => {

        let customerBase = await prisma.customers.findFirst({
            where: {
                username: customerDefault.username
            },
            select: {
                id: true,
                deliveries: true
            }
        });

        let deliveriesCustomer = customerBase?.deliveries

        let result = await findAllDeliveriesByCustomer.execute(
            //@ts-ignore
            customerBase?.id
        );

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('username');
        expect(result).toHaveProperty('deliveries');
        //@ts-ignore
        expect(result.deliveries).toHaveLength(deliveriesCustomer?.length);
    });

    it("Should not be able to find all deliveries by invalid Customer ID", async () => {

        await expect(findAllDeliveriesByCustomer.execute("failed"))
            .rejects.toEqual(new AppError("You are not allowed to perform this query.", 409))
    });
})