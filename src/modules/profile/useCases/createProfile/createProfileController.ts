import { Request, Response } from "express";
import { CreateProfileUseCase } from "./createProfileUseCase";


export class CreateProfileController {

    async handle(request: Request, response: Response) {

        const { type, name } = request.body;

        const createProfileUseCase = new CreateProfileUseCase();

        const result = await createProfileUseCase.execute({
            type,
            name
        })

        return response.status(201).json(result)
    }
}