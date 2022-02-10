import { Router } from "express";
import { CreateDeliveryController } from "../../../../modules/deliveries/useCases/createDelivery/createDeliveryController";


const deliveriesRoutes = Router();

const createDeliverController = new CreateDeliveryController();

deliveriesRoutes.post("/", createDeliverController.handle);

export { deliveriesRoutes };