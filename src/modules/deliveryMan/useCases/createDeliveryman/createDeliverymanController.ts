import { Request, Response } from "express";
import { CreateDeliverymanUseCase } from "./createDeliverymanUseCase";


export class CreateDeliverymanController {

    async handle(request: Request, response: Response) {

        const { email, username, password } = request.body;

        const createDeliverymanUseCase = new CreateDeliverymanUseCase();
        
        const result = await createDeliverymanUseCase.execute({
            email,
            username,
            password
        });

        return response.status(201).json(result)
    }
}