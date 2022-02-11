import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./updateDeliverymanUseCase";

export class UpdateDeliveryManController {

    async handle(request: Request, response: Response) {

        const { id_deliveryman } = request;
        const { id: id_delivery } = request.params;

        const updateDeliveryManUseCase = new UpdateDeliverymanUseCase();
        const updateDeliveryman = await updateDeliveryManUseCase.execute({
            id_delivery,
            id_deliveryman
        });
        
        return response.json(updateDeliveryman);
    }
}