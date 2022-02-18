import { DeliverymanDefault } from "../../../../database/seed";
import { AppError } from "../../../../shared/errors/appError";
import { AuthenticateDeliverymanUseCase } from "./authenticateDeliverymanUseCase";

const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();

describe("Authenticate Deliveryman", () => {

    it("Should be able to authenticate Deliveryman on App", async () => {

        let result = await authenticateDeliverymanUseCase.execute({
            username: DeliverymanDefault.username,
            password: String(DeliverymanDefault.password)
        })

        expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('message');
    });

    it("Should not be able to authenticate with incorrect password", async () => {

        await expect(authenticateDeliverymanUseCase.execute({
            username: DeliverymanDefault.username,
            password: "failed"
        })).rejects.toEqual(new AppError("Username or password invalid!", 401))
    });

    it("Should not be able to authenticate a non existent Deliverymam", async () => {

        await expect(authenticateDeliverymanUseCase.execute({
            username: "failedDeliveryman",
            password: "failedPassword"
        })).rejects.toEqual(new AppError("Username or password invalid!", 401))
    });
})