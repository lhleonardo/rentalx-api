import { Router } from "express";

import {
    makeForgotPasswordController,
    forgotPasswordValidator,
} from "../usecases/forgot-password";
import { createLoginValidator, makeLoginController } from "../usecases/login";
import {
    makeResetPasswordController,
    resetPasswordValidator,
} from "../usecases/reset-password";

const authRoutes = Router();

authRoutes.post("/auth", createLoginValidator, (req, res) =>
    makeLoginController().handle(req, res)
);

authRoutes.post("/forgot-password", forgotPasswordValidator, (req, res) =>
    makeForgotPasswordController().handle(req, res)
);

authRoutes.post("/reset-password/:token", resetPasswordValidator, (req, res) =>
    makeResetPasswordController().handle(req, res)
);

export { authRoutes };
