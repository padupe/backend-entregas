import { Request, Response } from "express";
import { FindAllDeliveriesAvailableUseCase } from "./findAllDeliveriesAvailableUseCase";

export class FindAllDeliveriesAvailableController {

    async handle(request: Request, response: Response){

        const findAllDeliveriesAvailableUseCase = new FindAllDeliveriesAvailableUseCase();
        const deliveries = await findAllDeliveriesAvailableUseCase.execute();

        return response.json(deliveries);
    }
}