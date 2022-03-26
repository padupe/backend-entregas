import { prisma } from "@database/prismaClient";
import { clearDataBase, populateDataBase } from "@database/seed";
import { AppError } from "@shared/errors/appError";
import { CreateCustomerUseCase } from "./createCustomerUseCase";

beforeAll(async () => {
    await clearDataBase();
    await populateDataBase();
});

afterAll(async () => {
    await clearDataBase();
    await populateDataBase();
});

const createCustomerUseCase = new CreateCustomerUseCase();

const customerTest = {
    email: "newcustomer@test.com",
    username: "newcustomer",
    password: "testPassword"
}

describe("Create Customer", () => {
    
    it("Should be able to create a new Customer", async () => {

        let newCustomer = await createCustomerUseCase.execute({
           email: customerTest.email,
           username: customerTest.username,
           password: customerTest.password
        })

        let verifyCustomerCreated = await prisma.customers.findUnique({
            where: {
                email: customerTest.email
            }
        })

        expect(verifyCustomerCreated?.email).toEqual(customerTest.email)
    });

    it("Should not be able to create a new Customer with already registered username", async () => {

       await expect(createCustomerUseCase.execute({
            email: "teste@email.com",
            username: customerTest.username,
            password: customerTest.password
       })
       ).rejects.toEqual(new AppError("Customer already exists!"))        
    });

    it("Should not be able to create a new Customer with already registered email", async () => {

        await expect(createCustomerUseCase.execute({
             email: customerTest.email,
             username: "failedCustomer",
             password: customerTest.password
        })
        ).rejects.toEqual(new AppError("Customer already exists!"))        
     })
})