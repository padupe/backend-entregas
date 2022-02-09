import { Router } from "express";
import { CreateDeliverymanController } from "../../../../modules/deliveryMan/useCases/createDeliveryman/createDeliverymanController";

const deliverymansRoutes = Router();

const createDeliverymanController = new CreateDeliverymanController();

deliverymansRoutes.post("/", createDeliverymanController.handle);

export { deliverymansRoutes };