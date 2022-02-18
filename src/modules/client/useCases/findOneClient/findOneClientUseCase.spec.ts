import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../shared/errors/appError";
import { FindOneClientUseCase } from "./findOneClientUseCase";

const findOneClientUseCase = new FindOneClientUseCase();

describe("Find one Client by ID", () => {

    it("Shoul be able to find one client with successfull", async () => {

        let clientBase = await prisma.clients.findFirst({
            select: {
                id: true
            }
        });

        let result = await findOneClientUseCase.execute({
            //@ts-ignore
            id_client: clientBase?.id
        });

        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('client');
    });

    it("Should not be able to find one cliente by invalid ID", async () => {

        await expect(findOneClientUseCase.execute({
            id_client: "failed"
        })).rejects.toEqual(new AppError("Client not found!"))
    });
})