import { Router } from "express";
import { ensureAuthenticateDeliveryman } from "../../../../middlewares/ensureAuthenticateDeliveryman";
import { CreateDeliverymanController } from "../../../../modules/deliveryMan/useCases/createDeliveryman/createDeliverymanController";
import { FindAllDeliveriesByDeliverymanController } from "../../../../modules/deliveryMan/useCases/findAllDeliveries/findAllDeliveriesByDeliverymanController";

const deliverymansRoutes = Router();

const createDeliverymanController = new CreateDeliverymanController();
const findAllDeliveriesByDeliveryman = new FindAllDeliveriesByDeliverymanController()

deliverymansRoutes.post("/", createDeliverymanController.handle);
deliverymansRoutes.get("/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesByDeliveryman.handle);

export { deliverymansRoutes };