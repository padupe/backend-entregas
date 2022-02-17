import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../shared/errors/appError";
import { CreateDeliverymanUseCase } from "./createDeliverymanUseCase";

const createDeliverymanUseCase = new CreateDeliverymanUseCase()

const deliverymanTest = {
    email: "newdeliveryman@test.com",
    username: "newdeliveryman",
    password: "testPassword"
}

describe("Create Client", () => {
    
    it("Should be able to create a new Client", async () => {

        let newDeliveryman = await createDeliverymanUseCase.execute({
           email: deliverymanTest.email,
           username: deliverymanTest.username,
           password: deliverymanTest.password
        })

        let verifyDeliverymanCreated = await prisma.deliverymans.findUnique({
            where: {
                email: deliverymanTest.email
            }
        })

        expect(verifyDeliverymanCreated?.email).toEqual(deliverymanTest.email)
    });

    it("Should not be able to create a new Deliveryman with already registered username", async () => {

       await expect(createDeliverymanUseCase.execute({
            email: "teste@email.com",
            username: deliverymanTest.username,
            password: deliverymanTest.password
       })
       ).rejects.toEqual(new AppError("Deliveryman already exists!"))        
    });

    it("Should not be able to create a new Deliveryman with already registered email", async () => {

        await expect(createDeliverymanUseCase.execute({
             email: deliverymanTest.email,
             username: "failedClient",
             password: deliverymanTest.password
        })
        ).rejects.toEqual(new AppError("Deliveryman already exists!"))        
     })
})