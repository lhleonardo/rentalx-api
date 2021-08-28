import { Request, Response } from "express";

import { BasicController } from "../../../core/controllers/basic-controller";
import { ListSpecificationsUseCase } from "./list-specifications-usecase";

export class ListSpecificationsController implements BasicController {
    private usecase: ListSpecificationsUseCase;

    constructor(listSpecificationsUseCase: ListSpecificationsUseCase) {
        this.usecase = listSpecificationsUseCase;
    }

    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const all = await this.usecase.execute();

        return response.status(200).json(all);
    }
}
