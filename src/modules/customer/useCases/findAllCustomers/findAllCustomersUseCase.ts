import "reflect-metadata"
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository"
import { inject, injectable } from "tsyringe"

@injectable()
export class FindAllCustomersUseCase {
    
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ){}

    async execute() {

        const customers = await this.customersRepository.findAll()

        return customers
    }
}