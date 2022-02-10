import { Router } from "express";
import { clientsRoutes } from "./clients.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { deliverymansRoutes } from "./deliveryman.routes";
import { deliveriesRoutes } from "./deliveries.routes";

const router = Router();

router.use("/clients", clientsRoutes);
router.use("/authenticate", authenticateRoutes);
router.use("/deliveryman", deliverymansRoutes);
router.use("/deliveries", deliveriesRoutes);

export { router };