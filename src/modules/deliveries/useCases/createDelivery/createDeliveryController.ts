import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./createDeliveryUseCase";

export class CreateDeliveryController {

    async handle(request: Request, response: Response) {

        const { item_name, id_client } = request.body;

        const createDeliveryUseCase = new CreateDeliveryUseCase();

        const newDelivery = await createDeliveryUseCase.execute({
            item_name,
            id_client
        });

        return response.json(newDelivery);
    };
};