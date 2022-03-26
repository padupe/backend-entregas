import { CustomersRepository } from "@modules/customer/infra/prisma/repositories/CustomersRepository"
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { container } from "tsyringe";

container.registerSingleton<ICustomersRepository>(
    "CustomersRepository",
    CustomersRepository
)