import { Router } from "express";
import { CreateClientController } from "../../../../modules/client/useCases/createClient/createClientController";
import { FindOneClientController } from "../../../../modules/client/useCases/findOneClient/findOneClientController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const findOneClientController = new FindOneClientController();

clientsRoutes.post("/", createClientController.handle);
clientsRoutes.get("/:id", findOneClientController.handle);

export { clientsRoutes };