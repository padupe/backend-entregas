import { prisma } from "../../../../database/prismaClient";
import { clientDefault } from "../../../../database/seed";
import { AppError } from "../../../../shared/errors/appError";
import { FindAllDeliveriesByClientUseCase } from "./findAllDeliveriesByClientUseCase";

const findAllDeliveriesByClient = new FindAllDeliveriesByClientUseCase();

describe("Find all deliveries by ID Client", () => {

    it("Should be able to list all deliveries by Client with successfull", async () => {

        let clientBase = await prisma.clients.findFirst({
            where: {
                username: clientDefault.username
            },
            select: {
                id: true,
                deliveries: true
            }
        });

        let deliveriesClient = clientBase?.deliveries

        let result = await findAllDeliveriesByClient.execute(
            //@ts-ignore
            clientBase?.id
        );

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('username');
        expect(result).toHaveProperty('deliveries');
        //@ts-ignore
        expect(result.deliveries).toHaveLength(deliveriesClient?.length);
    });

    it("Should not be able to find all deliveries by invalid Client ID", async () => {

        await expect(findAllDeliveriesByClient.execute("failed"))
            .rejects.toEqual(new AppError("You are not allowed to perform this query.", 409))
    });
})