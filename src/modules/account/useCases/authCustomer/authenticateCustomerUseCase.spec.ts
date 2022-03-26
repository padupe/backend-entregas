import { customerDefault } from "@database/seed";
import { AppError } from "@shared/errors/appError";
import { AuthenticateCustomerUseCase } from "./authenticateCustomerUseCase";

const authenticateCustomerUseCase = new AuthenticateCustomerUseCase();

describe("Authenticate Customer", () => {

    it("Should be able to authenticate Customer on App", async () => {

        let result = await authenticateCustomerUseCase.execute({
            username: customerDefault.username,
            password: String(customerDefault.password)
        })

        expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('message');
    });

    it("Should not be able to authenticate customer with incorrect password", async () => {

        await expect(authenticateCustomerUseCase.execute({
            username: customerDefault.username,
            password: "failed"
        })).rejects.toEqual(new AppError("Username or password invalid!", 401))
    });

    it("Should not be able to authenticate a non existent Customer", async () => {

        await expect(authenticateCustomerUseCase.execute({
            username: "failedCustomer",
            password: "failedPassword"
        })).rejects.toEqual(new AppError("Username or password invalid!", 401))
    })
})