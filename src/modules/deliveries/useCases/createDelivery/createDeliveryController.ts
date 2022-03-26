import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./createDeliveryUseCase";

export class CreateDeliveryController {

    async handle(request: Request, response: Response) {

        const { item_name } = request.body;
        const { id_customer } = request;

        const createDeliveryUseCase = new CreateDeliveryUseCase();

        const newDelivery = await createDeliveryUseCase.execute({
            item_name,
            id_customer
        });

        return response.json(newDelivery);
    };
};