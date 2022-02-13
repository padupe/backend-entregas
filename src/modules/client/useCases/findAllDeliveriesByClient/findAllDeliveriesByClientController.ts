import { Request, Response } from "express";
import { FindAllDeliveriesByClientUseCase } from "./findAllDeliveriesByClientUseCase";

export class FindAllDeliveriesByClientController {

    async handle(request: Request, response: Response){

        const { id_client } = request;

        const findAllDeliveriesUseCase = new FindAllDeliveriesByClientUseCase();
        const deliveries = await findAllDeliveriesUseCase.execute(id_client);

        return response.json(deliveries);
    }
}