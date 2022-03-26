import { Request, Response } from "express";
import { FindAllCustomersUseCase } from "./findAllCustomersUseCase";

export class FindAllCustomersController {

    async handle(request: Request, response: Response){

        const findAllCustomersUseCase = new FindAllCustomersUseCase();
        const customers = await findAllCustomersUseCase.execute();

        return response.json(customers);
    }
}