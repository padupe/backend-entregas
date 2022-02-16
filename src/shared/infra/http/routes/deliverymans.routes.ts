import { Router } from "express";
import { ensureAuthenticateAdmin } from "../../../../middlewares/ensureAuthenticateAdmin";
import { ensureAuthenticateDeliveryman } from "../../../../middlewares/ensureAuthenticateDeliveryman";
import { CreateDeliverymanController } from "../../../../modules/deliveryMan/useCases/createDeliveryman/createDeliverymanController";
import { FindAllDeliveriesByDeliverymanController } from "../../../../modules/deliveryMan/useCases/findAllDeliveries/findAllDeliveriesByDeliverymanController";
import { FindAllDeliverymansController } from "../../../../modules/deliveryMan/useCases/findAllDeliverymans/findAllDeliverymansController";
import { FindOneDeliverymanController } from "../../../../modules/deliveryMan/useCases/findOneDeliveryman/findOneDeliverymanController";

const deliverymansRoutes = Router();

const createDeliverymanController = new CreateDeliverymanController();
const findAllDeliveriesByDeliverymanController = new FindAllDeliveriesByDeliverymanController();
const findOneDeliverymanController = new FindOneDeliverymanController();
const findAllDeliverymansController = new FindAllDeliverymansController();

deliverymansRoutes.post("/", createDeliverymanController.handle);
deliverymansRoutes.get("/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesByDeliverymanController.handle);
deliverymansRoutes.get("/:id", ensureAuthenticateAdmin, findOneDeliverymanController.handle);
deliverymansRoutes.get("/", ensureAuthenticateAdmin, findAllDeliverymansController.handle)

export { deliverymansRoutes };