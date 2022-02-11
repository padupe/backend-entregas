import { Router } from "express";
import { ensureAuthenticateClient } from "../../../../middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "../../../../middlewares/ensureAuthenticateDeliveryman";
import { CreateDeliveryController } from "../../../../modules/deliveries/useCases/createDelivery/createDeliveryController";
import { FindAllDeliveriesAvailableController } from "../../../../modules/deliveries/useCases/findAllDeliveryAvailable/findAllDeliveriesAvailableController";
import { UpdateDeliveryManController } from "../../../../modules/deliveries/useCases/updateDeliveryman/updateDeliverymanController";
import { UpdateEndDateController } from "../../../../modules/deliveries/useCases/updateEndDate/updateEndDateController";

const deliveriesRoutes = Router();

const createDeliverController = new CreateDeliveryController();
const findAllDeliveriesAvailableController = new FindAllDeliveriesAvailableController();
const updateEndDateController = new UpdateEndDateController();
const updateDeliverymanController = new UpdateDeliveryManController();

deliveriesRoutes.post("/", ensureAuthenticateClient, createDeliverController.handle);
deliveriesRoutes.get("/available", ensureAuthenticateDeliveryman, findAllDeliveriesAvailableController.handle);
deliveriesRoutes.put("/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle);
deliveriesRoutes.put("/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle);

export { deliveriesRoutes };