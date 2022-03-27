import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllCustomersUseCase } from "./findAllCustomersUseCase";

export class FindAllCustomersController {

    async handle(request: Request, response: Response){

        const findAllCustomersUseCase = container.resolve(FindAllCustomersUseCase);
        const customers = await findAllCustomersUseCase.execute();

        return response.json(customers);
    }
}