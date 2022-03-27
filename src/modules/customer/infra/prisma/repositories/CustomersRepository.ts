import { prisma } from "@database/prismaClient";
import { ICreateCustomerDTO } from "@modules/customer/dtos/ICreateCustomerDTO";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { Customers, PrismaClient } from "@prisma/client"
import { AppError } from "@shared/errors/appError";

class CustomersRepository implements ICustomersRepository {
    private repository: PrismaClient

    constructor() {
        this.repository = prisma
    }

    async create({ email, username, password }: ICreateCustomerDTO): Promise<Customers> {
        
        const newCustomer = await this.repository.customers.create({
            data: {
                email,
                username,
                password
            }
        })

        return newCustomer
    }
    
    async findAll(): Promise<Customers[]> {

        const customers = await this.repository.customers.findMany({
            select: {
                id: true,
                username: true,
                email: true
            }
        })
        //@ts-ignore
        return customers
    }

    async findByEmail(email: string): Promise<Customers> {

        const customer = await this.repository.customers.findUnique({
            where: {
                email
            }
        })

        //@ts-ignore
        return customer
    }
    
    async findById(id_customer: string): Promise<Customers> {
        
        const customer = await this.repository.customers.findUnique({
            where: {
                id: id_customer
            }
        })

        //@ts-ignore
        return customer
    }

    async findByUsername(username: string): Promise<Customers> {
        
        const customer = await this.repository.customers.findUnique({
            where: {
                username
            }
        })

        //@ts-ignore
        return customer
    }
}

export { CustomersRepository }