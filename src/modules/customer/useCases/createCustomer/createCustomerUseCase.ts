import "reflect-metadata"
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { ICreateCustomerDTO } from "@modules/customer/dtos/ICreateCustomerDTO";
import { hashPassword } from "@helpers/bcrypt";

interface IResponseCreateCustomer {
    message: string;
    customer: Object;
}

@injectable()
export class CreateCustomerUseCase {

    constructor(
        @inject("CustomersRepository")
        private customersRepository: ICustomersRepository
    ){}

    async execute({ email, username, password }: ICreateCustomerDTO): Promise<IResponseCreateCustomer> {

        const usernameExists = await this.customersRepository.findByUsername(String(username))
        console.log("userCase - 1:", usernameExists)

        const emailExists = await this.customersRepository.findByEmail(email)
        console.log("userCase - 2:", emailExists)

        if (usernameExists || emailExists ) {
            throw new AppError('Customer already exists!');
        }

        const newCustomer = await this.customersRepository.create({
                email,
                username,
                password: await hashPassword(password)
        });

        return {
            message: "Customer registered successfully",
            customer: {
                id: newCustomer.id,
                email: newCustomer.email,
                username: newCustomer.username
            }
        };
    };
};