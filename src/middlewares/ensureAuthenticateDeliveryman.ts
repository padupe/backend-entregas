import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/appError";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";

interface IPayload {
    sub: string;
}


export async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token Missing", 403)
    }

    const [,token] = authHeader.split(" ");

    try {
        //@ts-ignore
        const { sub } = verify(token, process.env.SECRET_KEY) as IPayload;

        const verifyDeliveryman = await prisma.deliverymans.findUnique({
            where: {
                id: sub
            }
        })

        if(!verifyDeliveryman) {
            throw new AppError("Invalid Token", 401)
        }

        request.id_deliveryman = sub;

        return next();

    } catch (error) {
        throw new AppError("Invalid Token", 401)
    }
};