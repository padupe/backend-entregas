import { prisma } from "@database/prismaClient";
import { AppError } from "@shared/errors/appError";

interface IFindOneCustomer {
    id_customer: string;
}

interface IResponseFindOneCustomer {
    message: string;
    customer: Object;
}

export class FindOneCustomerUseCase {

    async execute({ id_customer }: IFindOneCustomer): Promise<IResponseFindOneCustomer> {

        const findCustomer = await prisma.customers.findUnique({
            where: {
                id: id_customer
            }
        })

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