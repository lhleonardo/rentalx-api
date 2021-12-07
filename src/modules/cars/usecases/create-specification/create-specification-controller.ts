import { Request, Response } from "express";

import { BasicController } from "../../../../core/controllers/basic-controller";
import { CreateSpecificationUseCase } from "./create-specification-usecase";

export class CreateSpecificationController implements BasicController {
    private useCase: CreateSpecificationUseCase;

    constructor(createSpecificationUseCase: CreateSpecificationUseCase) {
        this.useCase = createSpecificationUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const specification = await this.useCase.execute({ name, description });

        return response.status(201).json(specification);
    }
}
