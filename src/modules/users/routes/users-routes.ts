import { Router } from "express";

import { makeCreateUserController } from "../usecases/create-user/create-user-factory";

const usersRoutes = Router();

usersRoutes.post("/users", (req, res) =>
    makeCreateUserController().handle(req, res)
);

export { usersRoutes };
