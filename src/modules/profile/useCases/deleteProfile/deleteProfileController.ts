import { Request, Response } from "express";
import { DeleteProfileUseCase } from "./deleteProfileUseCase";

export class DeleteProfileController {

    async handle(request: Request, response: Response) {

        const { id } = request.params;

        const deleteProfileUseCase = new DeleteProfileUseCase();
        const profile = await deleteProfileUseCase.execute({
            id
        });
        
        return response.json(profile);
    }
}