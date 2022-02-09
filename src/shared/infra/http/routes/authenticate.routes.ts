import { Router } from "express";
import { AuthenticateClientController } from "../../../../modules/account/useCases/authClient/authenticateClientController";


const authenticateRoutes = Router();

const authenticateClientController = new AuthenticateClientController();

authenticateRoutes.post("/clients", authenticateClientController.handle);

export { authenticateRoutes };