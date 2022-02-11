import { Router } from "express";
import { CreateClientController } from "../../../../modules/client/useCases/createClient/createClientController";
import { FindAllClientsController } from "../../../../modules/client/useCases/findAllClients/findAllClientsController";
import { FindOneClientController } from "../../../../modules/client/useCases/findOneClient/findOneClientController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const findOneClientController = new FindOneClientController();
const findAllclientsController = new FindAllClientsController();

clientsRoutes.post("/", createClientController.handle);
clientsRoutes.get("/:id", findOneClientController.handle);
clientsRoutes.get("/", findAllclientsController.handle);

export { clientsRoutes };