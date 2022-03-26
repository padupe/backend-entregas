import { prisma } from "@database/prismaClient";
import { hash } from "bcrypt";
import { AppError } from "@shared/errors/appError";

interface ICreateCustomer {
    email: string;
    username: string;
    password: string;
};

interface IResponseCreateCustomer {
    message: string;
    customer: Object;
}

export class CreateCustomerUseCase {

    async execute({ email, username, password }: ICreateCustomer): Promise<IResponseCreateCustomer> {

        const usernameExists = await prisma.customers.findUnique({
            where: {
                username
            }
        });

        const emailExists = await prisma.customers.findUnique({
            where: {
                email
            }
        })
        
        if (usernameExists || emailExists ) {
            throw new AppError('Customer already exists!');
        };

        const hashPass = await hash(password, 10);

        const newCustomer = await prisma.customers.create({
            data: {
                email,
                username,
                password: hashPass
            }
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