import { Request, Response } from "express";

import { BasicController } from "../../../../core/controllers/basic-controller";
import { UpdateAvatarUsecase } from "./update-avatar-usecase";

export class UpdateAvatarController implements BasicController {
    constructor(private updateAvatarUsecase: UpdateAvatarUsecase) {}

    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { userId, file } = request;

        const avatarResult = await this.updateAvatarUsecase.execute({
            filename: file.filename,
            userId,
        });

        return response.status(200).json(avatarResult);
    }
}
