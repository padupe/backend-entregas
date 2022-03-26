import { prisma } from "@database/prismaClient";
import { AppError } from "@shared/errors/appError";
import { CreateProfileUseCase } from "./createProfileUseCase";

const createProfileUseCase = new CreateProfileUseCase();

const profileTest = {
    type: 4,
    name: "profileTest"
}

describe("Create Profile", () => {
    
    it("Should be able to create a new Profile", async () => {

        let newProfile = await createProfileUseCase.execute({
            type: profileTest.type,
            name: profileTest.name
        })

        let verifyProfileCreated = await prisma.profiles.findUnique({
            where: {
                type: profileTest.type
            }
        })

        expect(verifyProfileCreated?.name).toEqual(profileTest.name)
    });

    it("Should not be able to create a new Profile with already registered name", async () => {

       await expect(createProfileUseCase.execute({
            type: 5,
            name: profileTest.name
       })
       ).rejects.toEqual(new AppError("Profile already exists!"))        
    });

    it("Should not be able to create a new Deliveryman with already registered type", async () => {

        await expect(createProfileUseCase.execute({
            type: profileTest.type,
            name: "failedTest"
        })
        ).rejects.toEqual(new AppError("Profile already exists!"))        
     });
})