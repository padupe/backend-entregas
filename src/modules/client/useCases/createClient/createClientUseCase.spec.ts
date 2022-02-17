import { prisma } from "../../../../database/prismaClient";
import { clearDataBase, populateDataBase } from "../../../../database/seed";
import { AppError } from "../../../../shared/errors/appError";
import { CreateClientUseCase } from "./createClientUseCase";

beforeAll(async () => {
    await clearDataBase();
    await populateDataBase();
});

afterAll(async () => {
    await clearDataBase();
    await populateDataBase();
});

let createClientUseCase = new CreateClientUseCase();

const clientTest = {
    email: "newclient@test.com",
    username: "newclient",
    password: "testPassword"
}

describe("Create Client", () => {
    
    it("Should be able to create a new Client", async () => {

        let newClient = await createClientUseCase.execute({
           email: clientTest.email,
           username: clientTest.username,
           password: clientTest.password
        })

        let verifyClientCreated = await prisma.clients.findUnique({
            where: {
                email: clientTest.email
            }
        })

        expect(verifyClientCreated?.email).toEqual(clientTest.email)
    });

    it("Should not be able to create a new Client with already registered username", async () => {

       await expect(createClientUseCase.execute({
            email: "teste@email.com",
            username: clientTest.username,
            password: clientTest.password
       })
       ).rejects.toEqual(new AppError("Client already exists!"))        
    });

    it("Should not be able to create a new Client with already registered email", async () => {

        await expect(createClientUseCase.execute({
             email: clientTest.email,
             username: "failedClient",
             password: clientTest.password
        })
        ).rejects.toEqual(new AppError("Client already exists!"))        
     })
})