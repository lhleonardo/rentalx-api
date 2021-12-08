import { Router } from "express";

import { makeForgotPasswordController } from "../usecases/forgot-password/forgot-password-factory";
import { createForgotPasswordValidator } from "../usecases/forgot-password/forgot-password-validator";
import { createLoginValidator, makeLoginController } from "../usecases/login";

const authRoutes = Router();

authRoutes.post("/auth", createLoginValidator, (req, res) =>
    makeLoginController().handle(req, res)
);

authRoutes.post("/forgot-password", createForgotPasswordValidator, (req, res) =>
    makeForgotPasswordController().handle(req, res)
);

export { authRoutes };
