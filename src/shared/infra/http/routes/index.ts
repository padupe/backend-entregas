import { Router } from "express";
import { customersRoutes } from "./customers.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { deliverymansRoutes } from "./deliverymans.routes";
import { deliveriesRoutes } from "./deliveries.routes";
import { profilesRoutes } from "./profiles.routes";

const router = Router();

router.use("/customers", customersRoutes);
router.use("/authenticate", authenticateRoutes);
router.use("/deliverymans", deliverymansRoutes);
router.use("/deliveries", deliveriesRoutes);
router.use("/profiles", profilesRoutes);

export { router };