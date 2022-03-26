import { Request, Response } from "express";
import { AuthenticateCustomerUseCase } from "./authenticateCustomerUseCase";


export class AuthenticateCustomerController {

    async handle(request: Request, response: Response) {

        const { username, password } = request.body;

        const authenticateCustomerUseCase = new AuthenticateCustomerUseCase();
        
        const result = await authenticateCustomerUseCase.execute({
            username,
            password
        });

        return response.status(200).json(result)
    }
}