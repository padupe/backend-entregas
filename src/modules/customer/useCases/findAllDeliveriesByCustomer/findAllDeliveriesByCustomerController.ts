import { Request, Response } from "express";
import { FindAllDeliveriesByCustomerUseCase } from "./findAllDeliveriesByCustomerUseCase";

export class FindAllDeliveriesByCustomerController {

    async handle(request: Request, response: Response){

        const { id_customer } = request;

        const findAllDeliveriesUseCaseByCustomer = new FindAllDeliveriesByCustomerUseCase();
        const deliveries = await findAllDeliveriesUseCaseByCustomer.execute(id_customer);

        return response.json(deliveries);
    }
}