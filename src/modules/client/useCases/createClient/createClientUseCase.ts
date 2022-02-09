import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/appError";

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

        return newClient;
    };
};