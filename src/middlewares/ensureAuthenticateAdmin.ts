import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/appError";
import { verify } from "jsonwebtoken";
import { prisma } from "@database/prismaClient";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateAdmin(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token Missing", 403)
    }

    const [,token] = authHeader.split(" ");

    try {
        
        const { sub } = verify(token, String(process.env.SECRET_KEY)) as IPayload;

        const verifyAdmin = await prisma.admin.findUnique({
            where: {
                id: sub
            }
        })

        if(!verifyAdmin) {
            throw new AppError("Invalid Token", 401)
        }

        request.id_admin = sub;

        return next();

    } catch (error) {
        throw new AppError("Invalid Token", 401)
    }
};