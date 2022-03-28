import "reflect-metadata"
import { AppError } from "@shared/errors/appError"
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";

interface IFindOneCustomer {
    id_customer: string;
}

interface IResponseFindOneCustomer {
    message: string;
    customer: Object;
}

@injectable()
export class FindOneCustomerUseCase {

    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ){}

    async execute({ id_customer }: IFindOneCustomer): Promise<IResponseFindOneCustomer> {

        const findCustomer = await this.customersRepository.findById(id_customer)

        if(!findCustomer){
            throw new AppError("Customer not found!")
        }

        return {
            message: "Customer found with successfull",
            customer: {
                email: findCustomer.email,
                username: findCustomer.username
            }
        }
    } 
}