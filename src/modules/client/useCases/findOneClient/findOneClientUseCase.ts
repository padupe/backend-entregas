import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../shared/errors/appError";

interface IFindOneClient {
    id_client: string;
}

interface IResponseFindOneClient {
    message: string;
    client: Object;
}

export class FindOneClientUseCase {

    async execute({ id_client }: IFindOneClient): Promise<IResponseFindOneClient> {

        const findClient = await prisma.clients.findUnique({
            where: {
                id: id_client
            }
        })

        if(!findClient){
            throw new AppError("Client not found!")
        }

        return {
            message: "Client found with successfull",
            client: {
                email: findClient.email,
                username: findClient.username
            }
        }
    } 
}