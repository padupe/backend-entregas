import { prisma } from "../../../../database/prismaClient";
import { FindAllClientsUseCase } from "./findAllClientsUseCase";


const findAllClientsUseCase = new FindAllClientsUseCase();

describe("List all Clients registered on App", () => {

    it("Should be able to list all Clients", async () => {

        let result = await findAllClientsUseCase.execute();
        let clients = await prisma.clients.findMany({});

        expect(result).toHaveLength(clients.length);
        expect(clients).toHaveLength(result.length);
    });
    
    it("Should not be able to list all Clients", async () => {

        let result = await findAllClientsUseCase.execute();
        let clients = await prisma.clients.findMany({});

        expect(result).not.toHaveLength(clients.length-1);
        expect(result).not.toHaveLength(0);
        expect(result).not.toHaveLength(clients.length+1);
        expect(clients).not.toHaveLength(result.length-1);
        expect(clients).not.toHaveLength(0);
        expect(clients).not.toHaveLength(result.length+1);
    });
})