import { Request, Response } from "express";

import { BasicController } from "../../../../core/controllers/basic-controller";
import { ListCategoriesUseCase } from "./list-categories-usecase";

export class ListCategoriesController implements BasicController {
    private useCase: ListCategoriesUseCase;

    constructor(listCategoriesUseCase: ListCategoriesUseCase) {
        this.useCase = listCategoriesUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const categories = await this.useCase.execute();

        return response.status(200).json(categories);
    }
}
