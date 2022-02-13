import { Router } from "express";
import { ensureAuthenticateAdmin } from "../../../../middlewares/ensureAuthenticateAdmin";
import { CreateProfileController } from "../../../../modules/profile/useCases/createProfile/createProfileController";

const profilesRoutes = Router();

const createProfileController = new CreateProfileController();

profilesRoutes.post("/", ensureAuthenticateAdmin, createProfileController.handle);

export { profilesRoutes };