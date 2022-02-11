import { Request, Response } from "express";
import { FindAllDeliveriesByDeliverymanUseCase } from "./findAllDeliveriesByDeliverymanUseCase";

export class FindAllDeliveriesByDeliverymanController {

    async handle(request: Request, response: Response){

        const { id_deliveryman } = request;

        const findAllDeliveriesByDeliverymanUseCase = new FindAllDeliveriesByDeliverymanUseCase;
        const deliveries = await findAllDeliveriesByDeliverymanUseCase.execute(id_deliveryman);

        return response.json(deliveries);
    }
}