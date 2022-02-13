import { Request, Response } from "express";
import { AuthenticateAdminUseCase } from "./authenticateAdminUseCase";

export class AuthenticateAdminController {

    async handle(request: Request, response: Response) {

        const { username, password } = request.body;

        const authenticateAdminUseCase = new AuthenticateAdminUseCase();
        
        const result = await authenticateAdminUseCase.execute({
            username,
            password
        });

        return response.status(200).json(result)
    }
}