import { Router } from "express";
import { ensureAuthenticateClient } from "../../../../middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "../../../../middlewares/ensureAuthenticateDeliveryman";
import { CreateDeliveryController } from "../../../../modules/deliveries/useCases/createDelivery/createDeliveryController";
import { FindAllDeliveriesAvailableController } from "../../../../modules/deliveries/useCases/findAllDeliveryAvailable/findAllDeliveriesAvailableController";

const deliveriesRoutes = Router();

const createDeliverController = new CreateDeliveryController();
const findAllDeliveriesAvailableController = new FindAllDeliveriesAvailableController();

deliveriesRoutes.post("/", ensureAuthenticateClient, createDeliverController.handle);
deliveriesRoutes.get("/available", ensureAuthenticateDeliveryman, findAllDeliveriesAvailableController.handle);

export { deliveriesRoutes };