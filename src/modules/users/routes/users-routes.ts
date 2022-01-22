import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../core/config/upload";
import {
    createUserValidation,
    makeCreateUserController,
} from "../usecases/create-user";
import { makeUpdateAvatarController } from "../usecases/update-avatar/update-avatar-factory";

const usersRoutes = Router();
const uploadMiddleware = multer(uploadConfig.multer);

usersRoutes.post("/users", createUserValidation, (req, res) =>
    makeCreateUserController().handle(req, res)
);

usersRoutes.post(
    "/profile/avatar",
    uploadMiddleware.single("avatar"),
    (req, res) => makeUpdateAvatarController().handle(req, res)
);

export { usersRoutes };
