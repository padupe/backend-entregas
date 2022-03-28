import { Admin } from "@prisma/client"
import { ICreateAdminDTO } from "../dtos/ICreateAdminDTO"

export interface IAdminRepository {
    create({ email, username, password }: ICreateAdminDTO): Promise<Admin>
    find(username: string): Promise<Admin>
}