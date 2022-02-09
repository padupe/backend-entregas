import { Router } from "express";
import { clientsRoutes } from "./clients.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/clients", clientsRoutes);
router.use("/authenticate", authenticateRoutes);

export { router };