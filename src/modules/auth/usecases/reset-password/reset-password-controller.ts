import { Request, Response } from "express";

import { BasicController } from "../../../../core/controllers/basic-controller";
import { ResetPasswordUsecase } from "./reset-password-usecase";

export class ResetPasswordController implements BasicController {
    private resetPasswordUsecase: ResetPasswordUsecase;

    constructor(resetPasswordUsecase: ResetPasswordUsecase) {
        this.resetPasswordUsecase = resetPasswordUsecase;
    }

    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { token } = request.params;
        const { password, confirmPassword } = request.body;

        await this.resetPasswordUsecase.execute({
            token,
            password,
            confirmPassword,
        });

        return response.status(204).send();
    }
}
