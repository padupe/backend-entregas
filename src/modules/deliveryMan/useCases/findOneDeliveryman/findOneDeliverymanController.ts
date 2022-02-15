import { Request, Response } from "express";
import { FindOneDeliverymanUseCase } from "./findOneDeliverymanUseCase";

export class FindOneDeliverymanController {

    async handle(request: Request, response: Response) {

        const { id: id_deliveryman } = request.params;

        const findOneDeliverymanUseCase = new FindOneDeliverymanUseCase();
        const deliveryman = await findOneDeliverymanUseCase.execute({
            id_deliveryman
        })

        return response.json(deliveryman);
    }
}