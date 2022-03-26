import { AppError } from "../shared/errors/appError"
import { hash, compare } from "bcrypt"

export async function hashPassword(password: string) {
    return await hash(password, 10)
}

export async function verifyPassword(password: string, comparePassword: string) {
    const result = await compare(password, comparePassword)
    
    if (result == false) {
        throw new AppError("Username or password invalid!", 401)
    }

    return result
}