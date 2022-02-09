import { Router } from "express";
import { CreateClientController } from "../../../../modules/client/useCases/createClient/createClientController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();

clientsRoutes.post("/", createClientController.handle);

export { clientsRoutes };