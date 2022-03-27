import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "./createCustomerUseCase";


export class CreateCustomerController {

    async handle(request: Request, response: Response) {

        const { email, username, password } = request.body;

        const createCustomerUseCase = container.resolve(CreateCustomerUseCase);
        
        const result = await createCustomerUseCase.execute(request.body);

        return response.status(201).json(result)
    }
}