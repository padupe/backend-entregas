import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swagger from "swagger-ui-express";
import { AppError } from "../../errors/appError";
import { router } from "./routes";
import swaggerConfig from "../../../swagger.json"

const app = express();

app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        }); 
    };
    console.error(err);

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}.`
    });
});

export { app };