import { Router } from "express";
import { ensureAuthenticateAdmin } from "../../../../middlewares/ensureAuthenticateAdmin";
import { ensureAuthenticateCustomer } from "../../../../middlewares/ensureAuthenticateCustomer";
import { CreateCustomerController } from "@modules/customer/useCases/createCustomer/createCustomerController";
import { FindAllCustomersController } from "@modules/customer/useCases/findAllCustomers/findAllCustomersController";
import { FindAllDeliveriesByCustomerController } from "@modules/customer/useCases/findAllDeliveriesByCustomer/findAllDeliveriesByCustomerController";
import { FindOneCustomerController } from "@modules/customer/useCases/findOneCustomer/findOneCustomerController";

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const findOneCustomerController = new FindOneCustomerController();
const findAllCustomersController = new FindAllCustomersController();
const findAllDeliveriesByCustomerController = new FindAllDeliveriesByCustomerController();

customersRoutes.post("/", createCustomerController.handle);
customersRoutes.get("/deliveries", ensureAuthenticateCustomer, findAllDeliveriesByCustomerController.handle);
customersRoutes.get("/:id", ensureAuthenticateAdmin, findOneCustomerController.handle);
customersRoutes.get("/", ensureAuthenticateAdmin, findAllCustomersController.handle);


export { customersRoutes };