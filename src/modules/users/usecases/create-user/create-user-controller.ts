import { Request, Response } from "express";

import { BasicController } from "../../../core/controllers/basic-controller";
import { CreateUserUsecase } from "./create-user-usecase";

export class CreateUserController implements BasicController {
    private readonly usecase: CreateUserUsecase;

    constructor(usecase: CreateUserUsecase) {
        this.usecase = usecase;
    }
    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const {
            email,
            password,
            confirmPassword,
            name,
            avatar,
            driverLicense,
        } = request.body;

        const result = await this.usecase.execute({
            email,
            password,
            confirmPassword,
            name,
            avatar,
            driverLicense,
        });

        return response.status(201).json(result);
    }
}
