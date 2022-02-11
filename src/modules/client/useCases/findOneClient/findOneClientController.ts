import { Request, Response } from "express";
import { FindOneClientUseCase } from "./findOneClientUseCase";


export class FindOneClientController {

    async handle(request: Request, response: Response) {

        const { id: id_client } = request.params;

        const findOneClientUseCase = new FindOneClientUseCase();
        const client = await findOneClientUseCase.execute({
            id_client
        });
        
        return response.json(client);
    }
}