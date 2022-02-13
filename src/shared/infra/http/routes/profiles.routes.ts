import { Router } from "express";
import { CreateProfileController } from "../../../../modules/profile/useCases/createProfile/createProfileController";

const profilesRoutes = Router();

const createProfileController = new CreateProfileController();

profilesRoutes.post("/", createProfileController.handle);

export { profilesRoutes };