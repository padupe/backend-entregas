import { Router } from "express";
import { AuthenticateAdminController } from "../../../../modules/account/useCases/authAdmin/authenticateAdminController";
import { AuthenticateCustomerController } from "../../../../modules/account/useCases/authCustomer/authenticateCustomerController";
import { AuthenticateDeliverymanController } from "../../../../modules/account/useCases/authDeliveryman/authenticateDeliverymanController";


const authenticateRoutes = Router();

const authenticateCustomerController = new AuthenticateCustomerController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const authenticateAdminController = new AuthenticateAdminController();

authenticateRoutes.post("/customers", authenticateCustomerController.handle);
authenticateRoutes.post("/deliverymans", authenticateDeliverymanController.handle);
authenticateRoutes.post("/admin", authenticateAdminController.handle);

export { authenticateRoutes };