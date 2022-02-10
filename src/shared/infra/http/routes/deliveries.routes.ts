import { Router } from "express";
import { ensureAuthenticateClient } from "../../../../middlewares/ensureAuthenticateClient";
import { CreateDeliveryController } from "../../../../modules/deliveries/useCases/createDelivery/createDeliveryController";


const deliveriesRoutes = Router();

const createDeliverController = new CreateDeliveryController();

deliveriesRoutes.post("/", ensureAuthenticateClient, createDeliverController.handle);

export { deliveriesRoutes };