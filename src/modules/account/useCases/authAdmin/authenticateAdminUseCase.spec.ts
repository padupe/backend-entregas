import { adminApp } from "@database/seed"
import { AdminRepository } from "@modules/account/infra/prisma/repositories/AdminRepository"
import { AppError } from "@shared/errors/appError"
import { AuthenticateAdminUseCase } from "./authenticateAdminUseCase"

let authenticateAdminUseCase: AuthenticateAdminUseCase
let adminRepository: AdminRepository

describe("Autenticate Admin", () => {

    beforeEach(()=> {
        adminRepository = new AdminRepository()
        authenticateAdminUseCase = new AuthenticateAdminUseCase(adminRepository)
    })

    it("Should be able to authenticate Admin on App", async () => {

        let result = await authenticateAdminUseCase.execute({
            username: adminApp.username,
            password: String(adminApp.password)
        })

        expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('message');
    });

    it("Should not be able to authehticate with incorrect password", async () => {

        await expect(authenticateAdminUseCase.execute({
            username: adminApp.username,
            password: "failed"
        })).rejects.toEqual(new AppError("Username or password invalid!", 401))
    });

    it("Should not be able to authenticate a non existent Admin", async () => {

        await expect(authenticateAdminUseCase.execute({
            username: "failedAdmin",
            password: "failedPassword"
        })).rejects.toEqual(new AppError("Username or password invalid!", 401));
    })
})