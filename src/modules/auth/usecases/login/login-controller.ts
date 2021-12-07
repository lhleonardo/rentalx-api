import { Request, Response } from "express";

import { BasicController } from "../../../../core/controllers/basic-controller";
import { LoginUseCase } from "./login-usecase";

export class LoginController implements BasicController {
    private loginUsecase: LoginUseCase;

    constructor(loginUsecase: LoginUseCase) {
        this.loginUsecase = loginUsecase;
    }

    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { email, password } = request.body;

        const result = await this.loginUsecase.execute({ email, password });

        return response.status(200).json(result);
    }
}
