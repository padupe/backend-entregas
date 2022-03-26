import { prisma } from "@database/prismaClient";
import { hash } from "bcrypt";
import { AppError } from "@shared/errors/appError";

interface ICreateDeliveryman {
    email: string;
    username: string;
    password: string;
};

interface IResponseCreateDeliveryman {
    message: string;
    deliveryman: Object;
}

export class CreateDeliverymanUseCase {
    async execute({ email, username, password }: ICreateDeliveryman): Promise<IResponseCreateDeliveryman> {
        
        const usernameExists = await prisma.deliverymans.findUnique({
            where: {
                username
            }
        });

        const emailExists = await prisma.deliverymans.findUnique({
            where: {
                email
            }
        })
        
        if (usernameExists || emailExists ) {
            throw new AppError('Deliveryman already exists!');
        };

        const hashPass = await hash(password, 10);

        const newDeliveryman = await prisma.deliverymans.create({
            data: {
                email,
                username,
                password: hashPass
            }
        });

        return {
            message: "Deliveryman registered successfully",
            deliveryman: {
                id: newDeliveryman.id,
                email: newDeliveryman.email,
                username: newDeliveryman.username
            }
        };
    };
};