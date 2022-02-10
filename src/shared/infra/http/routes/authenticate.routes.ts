import { Router } from "express";
import { AuthenticateClientController } from "../../../../modules/account/useCases/authClient/authenticateClientController";
import { AuthenticateDeliverymanController } from "../../../../modules/account/useCases/authDeliveryman/authenticateDeliverymanController";


const authenticateRoutes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

authenticateRoutes.post("/clients", authenticateClientController.handle);
authenticateRoutes.post("/deliverymans", authenticateDeliverymanController.handle);

export { authenticateRoutes };