import { Request, Response } from "express";
import { FindOneCustomerUseCase } from "./findOneCustomerUseCase";


export class FindOneCustomerController {

    async handle(request: Request, response: Response) {

        const { id: id_customer } = request.params;

        const findOneCustomerUseCase = new FindOneCustomerUseCase();
        const customer = await findOneCustomerUseCase.execute({
            id_customer
        });
        
        return response.json(customer);
    }
}