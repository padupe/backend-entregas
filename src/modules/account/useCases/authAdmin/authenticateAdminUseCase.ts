import "reflect-metadata"
import { verifyPassword } from "@helpers/bcrypt"
import { signJWT } from "@helpers/jsonwebtoken"
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { IAdminRepository } from "@modules/account/repositories/IAdminRepository";

interface IAuthenticateAdmin {
    username: string;
    password: string;
};

interface IResponseAuthenticate {
    message: string;
    token: string;
};

@injectable()
export class AuthenticateAdminUseCase {

    constructor(
        @inject('AdminRepository')
        private adminRepository: IAdminRepository
    ){}

    async execute({ username, password }: IAuthenticateAdmin): Promise<IResponseAuthenticate> {

        const userAuth = await this.adminRepository.find(username)

        if(!userAuth) {
            throw new AppError("Username or password invalid!", 401);
        };

        const verifyPass = await verifyPassword(password, userAuth.password);

        if(!verifyPass) {
            throw new AppError("Username or password invalid!", 401);
        };

        const token = signJWT({username}, String(process.env.SECRET_KEY), {
            subject: userAuth.id,
            expiresIn: "1d"
        });

        return {
            message: "Admin Authenticated!",
            token
        };

    };
};