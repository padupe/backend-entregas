import { Router } from "express";
import { clientsRoutes } from "./clients.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { deliverymansRoutes } from "./deliveryman.routes";
import { deliveriesRoutes } from "./deliveries.routes";
import { profilesRoutes } from "./profiles.routes";

const router = Router();

router.use("/clients", clientsRoutes);
router.use("/authenticate", authenticateRoutes);
router.use("/deliveryman", deliverymansRoutes);
router.use("/deliveries", deliveriesRoutes);
router.use("/profiles", profilesRoutes);

export { router };