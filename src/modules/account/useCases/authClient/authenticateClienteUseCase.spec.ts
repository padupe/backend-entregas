import { clientDefault } from "../../../../database/seed";
import { AppError } from "../../../../shared/errors/appError";
import { AuthenticateClientUseCase } from "./authenticateClientUseCase";

const authenticateClientUseCase = new AuthenticateClientUseCase();

describe("Authenticate Client", () => {

    it("Should be able to authenticate Client on App", async () => {

        let result = await authenticateClientUseCase.execute({
            username: clientDefault.username,
            password: String(clientDefault.password)
        })

        expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('message');
    });

    it("Should not be able to authenticate client with incorrect password", async () => {

        await expect(authenticateClientUseCase.execute({
            username: clientDefault.username,
            password: "failed"
        })).rejects.toEqual(new AppError("Username or password invalid!", 401))
    });

    it("Should not be able to authenticate a non existent Client", async () => {

        await expect(authenticateClientUseCase.execute({
            username: "failedClient",
            password: "failedPassword"
        })).rejects.toEqual(new AppError("Username or password invalid!", 401))
    })
})