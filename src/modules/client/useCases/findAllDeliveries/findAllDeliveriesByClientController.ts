import { Request, Response } from "express";
import { FindAllDeliveriesByClientUseCase } from "./findAllDeliveriesByClientUseCase";

export class FindAllDeliveriesByClientController {

    async handle(request: Request, response: Response){

        const { id_client } = request;

        console.log("ID", id_client)

        const findAllDeliveriesUseCase = new FindAllDeliveriesByClientUseCase();
        const deliveries = await findAllDeliveriesUseCase.execute(id_client);

        return response.json(deliveries);
    }
}