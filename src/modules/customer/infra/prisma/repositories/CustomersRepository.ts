import { prisma } from "@database/prismaClient";
import { ICreateCustomerDTO } from "@modules/customer/dtos/ICreateCustomerDTO";
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { Customers, PrismaClient } from "@prisma/client"

class CustomersRepository implements ICustomersRepository {
    private repository: PrismaClient

    constructor() {
        this.repository = prisma
    }

    async create({ email, username, password }: ICreateCustomerDTO): Promise<Customers> {
        
        const newCustomer = await prisma.customers.create({
            data: {
                email,
                username,
                password
            }
        })

        return newCustomer
    }
    
    async findAll(): Promise<Customers[]> {

        const customers = await prisma.customers.findMany({
            select: {
                id: true,
                email: true,
                username: true
            }
        })
        
        //@ts-ignore
        return customers
    }

    async findByEmail(email: string): Promise<Customers> {

        const customer = await prisma.customers.findUnique({
            where: {
                email
            }
        })

        //@ts-ignore
        return customer
    }
    
    async findById(id_customer: string): Promise<Customers> {
        
        const customer = await prisma.customers.findUnique({
            where: {
                id: id_customer
            }
        })

        //@ts-ignore
        return customer
    }

    async findByUsername(username: string): Promise<Customers> {
        
        const customer = await prisma.customers.findUnique({
            where: {
                username
            }
        });

        //@ts-ignore
        return customer
    }
    
    async findAllDeliveriesByCustomer(id_customer: string): Promise<Customers> {
        
        const deliveriesByCustomer = await prisma.customers.findUnique({
            where: {
                id: id_customer
            },
            select: {
                id: true,
                username: true,
                deliveries: {
                    select: {
                        id: true,
                        item_name: true,
                        created_at: true,
                    }
                }
            }           
        })

        //@ts-ignore
        return deliveriesByCustomer
    }
}

export { CustomersRepository }