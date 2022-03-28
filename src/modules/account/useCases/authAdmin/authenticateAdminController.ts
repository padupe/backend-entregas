import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateAdminUseCase } from "./authenticateAdminUseCase";

export class AuthenticateAdminController {

    async handle(request: Request, response: Response) {

        const { username, password } = request.body;

        const authenticateAdminUseCase = container.resolve(AuthenticateAdminUseCase)
        const result = await authenticateAdminUseCase.execute(request.body)

        return response.status(200).json(result)
    }
}