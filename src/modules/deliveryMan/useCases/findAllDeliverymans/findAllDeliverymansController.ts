import { Request, Response } from "express";
import { FindAllDeliverymansUseCase } from "./findAllDeliverymansUseCase";

export class FindAllDeliverymansController {

    async handle(request: Request, response: Response) {

        const findAllDeliverymansUseCase = new FindAllDeliverymansUseCase();
        const deliverymans = await findAllDeliverymansUseCase.execute();

        return response.json(deliverymans);
    }
}