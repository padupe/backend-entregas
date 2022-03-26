import { Request, Response } from "express";
import { CreateCustomerUseCase } from "./createCustomerUseCase";



export class CreateCustomerController {

    async handle(request: Request, response: Response) {

        const { email, username, password } = request.body;

        const createCustomerUseCase = new CreateCustomerUseCase();
        
        const result = await createCustomerUseCase.execute({
            email,
            username,
            password
        });

        return response.status(201).json(result)
    }
}