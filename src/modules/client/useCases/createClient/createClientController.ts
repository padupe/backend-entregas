import { Request, Response } from "express";
import { CreateClientUseCase } from "./createClientUseCase";



export class CreateClientController {

    async handle(request: Request, response: Response) {

        const { email, username, password } = request.body;

        const createClientUseCase = new CreateClientUseCase();
        
        const result = await createClientUseCase.execute({
            email,
            username,
            password
        });

        return response.status(201).json(result)
    }
}