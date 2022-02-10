import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/appError";

interface ICreateClient {
    email: string;
    username: string;
    password: string;
};

interface IResponseCreateClient {
    message: string;
    client: Object;
}

export class CreateClientUseCase {

    async execute({ email, username, password }: ICreateClient): Promise<IResponseCreateClient> {

        const usernameExists = await prisma.clients.findUnique({
            where: {
                username
            }
        });

        const emailExists = await prisma.clients.findUnique({
            where: {
                email
            }
        })
        
        if (usernameExists || emailExists ) {
            throw new AppError('Client already exists!');
        };

        const hashPass = await hash(password, 10);

        const newClient = await prisma.clients.create({
            data: {
                email,
                username,
                password: hashPass
            }
        });

        return {
            message: "Client registered successfully",
            client: {
                id: newClient.id,
                email: newClient.id,
                username: newClient.username
            }
        };
    };
};