import { prisma } from "@database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/appError";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
};

interface IResponseAuthenticate {
    message: string;
    token: string;
};

export class AuthenticateDeliverymanUseCase {

    async execute({ username, password }: IAuthenticateDeliveryman): Promise<IResponseAuthenticate> {

        const userAuth = await prisma.deliverymans.findFirst({
            where: {
                username
            }
        });

        if(!userAuth) {
            throw new AppError("Username or password invalid!", 401);
        };

        const verifyPassword = await compare(password, userAuth.password);

        if(!verifyPassword) {
            throw new AppError("Username or password invalid!", 401);
        };

        const token = sign({username}, String(process.env.SECRET_KEY), {
            subject: userAuth.id,
            expiresIn: "1d"
        });

        return {
            message: "Deliveryman Authenticated!",
            token
        };
    };
};