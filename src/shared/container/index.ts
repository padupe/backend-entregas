import { container } from "tsyringe";
import { CustomersRepository } from "@modules/customer/infra/prisma/repositories/CustomersRepository"
import { ICustomersRepository } from "@modules/customer/repositories/ICustomersRepository";
import { IAdminRepository } from "@modules/account/repositories/IAdminRepository";
import { AdminRepository } from "@modules/account/infra/prisma/repositories/AdminRepository";

container.registerSingleton<ICustomersRepository>(
    "CustomersRepository",
    CustomersRepository
)

container.registerSingleton<IAdminRepository>(
    "AdminRepository",
    AdminRepository
)