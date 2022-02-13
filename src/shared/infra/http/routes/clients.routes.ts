import { Router } from "express";
import { ensureAuthenticateAdmin } from "../../../../middlewares/ensureAuthenticateAdmin";
import { ensureAuthenticateClient } from "../../../../middlewares/ensureAuthenticateClient";
import { CreateClientController } from "../../../../modules/client/useCases/createClient/createClientController";
import { FindAllClientsController } from "../../../../modules/client/useCases/findAllClients/findAllClientsController";
import { FindAllDeliveriesByClientController } from "../../../../modules/client/useCases/findAllDeliveriesByClient/findAllDeliveriesByClientController";
import { FindOneClientController } from "../../../../modules/client/useCases/findOneClient/findOneClientController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const findOneClientController = new FindOneClientController();
const findAllclientsController = new FindAllClientsController();
const findAllDeliveriesByClientController = new FindAllDeliveriesByClientController();

clientsRoutes.post("/", createClientController.handle);
clientsRoutes.get("/deliveries", ensureAuthenticateClient, findAllDeliveriesByClientController.handle);
clientsRoutes.get("/:id", ensureAuthenticateAdmin, findOneClientController.handle);
clientsRoutes.get("/", ensureAuthenticateAdmin, findAllclientsController.handle);


export { clientsRoutes };