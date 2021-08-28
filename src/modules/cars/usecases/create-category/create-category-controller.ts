import { Request, Response } from "express";

import { BasicController } from "../../../core/controllers/basic-controller";
import { CreateCategoryUseCase } from "./create-category-usecase";

export class CreateCategoryController implements BasicController {
    private useCase: CreateCategoryUseCase;

    constructor(createCategoryUseCase: CreateCategoryUseCase) {
        this.useCase = createCategoryUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const created = await this.useCase.execute({ name, description });

        return response.status(201).json(created);
    }
}
