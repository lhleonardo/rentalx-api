import { Router } from "express";

import { createLoginValidator, makeLoginController } from "../usecases/login";

const authRoutes = Router();

authRoutes.post("/auth", createLoginValidator, (req, res) =>
    makeLoginController().handle(req, res)
);

export { authRoutes };
