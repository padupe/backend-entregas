import { Router } from "express";
import { AuthenticateAdminController } from "../../../../modules/account/useCases/authAdmin/authenticateAdminController";
import { AuthenticateClientController } from "../../../../modules/account/useCases/authClient/authenticateClientController";
import { AuthenticateDeliverymanController } from "../../../../modules/account/useCases/authDeliveryman/authenticateDeliverymanController";


const authenticateRoutes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const authenticateAdminController = new AuthenticateAdminController();

authenticateRoutes.post("/clients", authenticateClientController.handle);
authenticateRoutes.post("/deliverymans", authenticateDeliverymanController.handle);
authenticateRoutes.post("/admin", authenticateAdminController.handle);

export { authenticateRoutes };