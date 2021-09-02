import { Request, Response } from "express";

import { BasicController } from "../../../core/controllers/basic-controller";
import { ImportCategoryUseCase } from "./import-category-usecase";

export class ImportCategoryController implements BasicController {
    private useCase: ImportCategoryUseCase;

    constructor(importCategoryUseCase: ImportCategoryUseCase) {
        this.useCase = importCategoryUseCase;
    }

    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { file } = request;

        this.useCase.execute(file);

        return response.status(200).send();
    }
}
