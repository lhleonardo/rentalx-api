import { Router } from "express";

import {
    createUserValidation,
    makeCreateUserController,
} from "../usecases/create-user";

const usersRoutes = Router();

usersRoutes.post("/users", createUserValidation, (req, res) =>
    makeCreateUserController().handle(req, res)
);

export { usersRoutes };
