import { prisma } from "@database/prismaClient";
import { AppError } from "@shared/errors/appError";
import { verifyPassword } from "@helpers/bcrypt";
import { signJWT } from "@helpers/jsonwebtoken";

interface IAuthenticateCustomer {
    username: string;
    password: string;
};

interface IResponseAuthenticate {
    message: string;
    token: string;
};

export class AuthenticateCustomerUseCase {

    async execute({ username, password }: IAuthenticateCustomer): Promise<IResponseAuthenticate> {

        const userAuth = await prisma.customers.findFirst({
            where: {
                username
            }
        });

        if(!userAuth) {
            throw new AppError("Username or password invalid!", 401);
        };

        const verifyPass = await verifyPassword(password, userAuth.password);

        const token = signJWT({username}, String(process.env.SECRET_KEY), {
            subject: userAuth.id,
            expiresIn: "1d"
        });

        return {
            message: "User Authenticated!",
            token
        };

    };
};