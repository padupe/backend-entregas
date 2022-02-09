import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
    email: string;
    username: string;
    password: string;
};

export class CreateClientUseCase {

    async execute({ email, username, password }: ICreateClient) {

        const usernameExists = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive"
                }
            }
        });

        const emailExists = await prisma.clients.findFirst({
            where: {
                email
            }
        })
        
        if (usernameExists || emailExists ) {
            throw new Error('Client aldready exists!')
        };

        const hashPass = await hash(password, 10);

        const newClient = await prisma.clients.create({
            data: {
                email,
                username,
                password: hashPass
            }
        });

        return newClient;
    };
};