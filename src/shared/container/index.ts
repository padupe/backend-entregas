import { container } from "tsyringe";
import { CustomersRepository } from "@modules/customer/infra/prisma/repositories/CustomersRepository"
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";

container.registerSingleton<ICustomersRepository>(
    "CustomersRepository",
    CustomersRepository
)