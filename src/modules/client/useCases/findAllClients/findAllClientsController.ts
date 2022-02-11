import { Request, Response } from "express";
import { FindAllClientsUseCase } from "./findAllClientsUseCase";

export class FindAllClientsController {

    async handle(request: Request, response: Response){

        const findAllClientsUseCase = new FindAllClientsUseCase();
        const clients = await findAllClientsUseCase.execute();

        return response.json(clients);
    }
}