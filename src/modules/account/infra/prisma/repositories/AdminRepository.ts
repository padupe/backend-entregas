import { prisma } from "@database/prismaClient";
import { ICreateAdminDTO } from "@modules/account/dtos/ICreateAdminDTO";
import { IAdminRepository } from "@modules/account/repositories/IAdminRepository";
import { Admin, PrismaClient } from "@prisma/client";

class AdminRepository implements IAdminRepository {
    private repository: PrismaClient

    constructor() {
        this.repository = prisma
    }
    
    async create({ email, username, password }: ICreateAdminDTO): Promise<Admin> {
        
        const admin = await this.repository.admin.create({
            data: {
                email,
                username,
                password
            }
        })

        return admin
    }

    async find(username: string): Promise<Admin> {
        
        const admin = await this.repository.admin.findUnique({
            where: {
                username
            }
        })

        //@ts-ignore
        return admin
    }  
}

export { AdminRepository }