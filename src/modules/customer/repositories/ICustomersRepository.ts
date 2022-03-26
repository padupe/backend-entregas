import { Customers } from "@prisma/client"
import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO"

export interface ICustomersRepository {
    create({ email, username, password }: ICreateCustomerDTO): Promise<Customers>
    findAll(): Promise<Customers[]>
    findById(id_customer: string): Promise<Customers>
    findAllDeliveriesByCustomer(id_customer: string): Promise<Customers>
}