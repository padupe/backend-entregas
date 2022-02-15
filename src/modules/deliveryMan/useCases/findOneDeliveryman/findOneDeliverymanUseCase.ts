import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../shared/errors/appError";

interface IFindOneDeliveryman {
    id_deliveryman: string
}

interface IResponseFindOneDeliveryman {
    message: string;
    deliveryman: Object;
}

export class FindOneDeliverymanUseCase {

    async execute({ id_deliveryman}: IFindOneDeliveryman): Promise<IResponseFindOneDeliveryman> {

        const findDeliveryman = await prisma.deliverymans.findUnique({
            where: {
                id: id_deliveryman
            }
        })

        if(!findDeliveryman) {
            throw new AppError("Deliveryman not found!")
        }

        return {
            message: "Deliveryman found with successfull",
            deliveryman: {
                email: findDeliveryman.email,
                username: findDeliveryman.username
            }
        }
    }
}