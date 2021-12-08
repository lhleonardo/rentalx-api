import { Request, Response } from "express";

import { BasicController } from "../../../../core/controllers/basic-controller";
import { ForgotPasswordUsecase } from "./forgot-password-usecase";

export class ForgotPasswordController implements BasicController {
    private forgotPasswordUsecase: ForgotPasswordUsecase;

    constructor(forgotPasswordUsecase: ForgotPasswordUsecase) {
        this.forgotPasswordUsecase = forgotPasswordUsecase;
    }

    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { email } = request.body;

        await this.forgotPasswordUsecase.execute({ email });

        return response.status(201).send();
    }
}
