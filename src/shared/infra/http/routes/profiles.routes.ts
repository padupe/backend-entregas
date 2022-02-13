import { Router } from "express";
import { ensureAuthenticateAdmin } from "../../../../middlewares/ensureAuthenticateAdmin";
import { CreateProfileController } from "../../../../modules/profile/useCases/createProfile/createProfileController";
import { DeleteProfileController } from "../../../../modules/profile/useCases/deleteProfile/deleteProfileController";

const profilesRoutes = Router();

const createProfileController = new CreateProfileController();
const deleteProfileController = new DeleteProfileController();

profilesRoutes.post("/", ensureAuthenticateAdmin, createProfileController.handle);
profilesRoutes.delete("/delete/:id", ensureAuthenticateAdmin, deleteProfileController.handle);

export { profilesRoutes };