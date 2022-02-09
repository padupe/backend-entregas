import { prisma } from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
};

interface IResponseAuthenticate {
    message: string;
    token: string;
};

export class AuthenticateClientUseCase {

    async execute({ username, password }: IAuthenticateClient): Promise<IResponseAuthenticate> {

        const userAuth = await prisma.clients.findFirst({
            where: {
                username
            }
        });

        if(!userAuth) {
            throw new Error("Username or password invalid!")
        };

        const verifyPassword = await compare(password, userAuth.password);

        if(!verifyPassword) {
            throw new Error("Username or password invalid!");
        };

        //@ts-ignore
        const token = sign({username}, process.env.SECRET_KEY, {
            subject: userAuth.id,
            expiresIn: "1d"
        });

        return {
            message: "User Authenticated!",
            token
        };

    };
};