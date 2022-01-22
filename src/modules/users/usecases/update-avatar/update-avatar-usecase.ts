import path from "path";

import uploadConfig from "../../../../core/config/upload";
import { StorageProvider } from "../../../../core/providers/storage/storage-provider";
import { BasicUsecase } from "../../../../core/usecases/basic-service";
import { InvalidUserError } from "../../errors/invalid-user-error";
import { User } from "../../models/user";
import { UsersRepository } from "../../repositories/users-repository";

type Request = {
    filename: string;
    userId: string;
};

type AvatarResponse = {
    userId: string;
    avatar: string;

    avatarURL: string;
};

export class UpdateAvatarUsecase
    implements BasicUsecase<Request, AvatarResponse>
{
    constructor(
        private usersRepository: UsersRepository,
        private storageProvider: StorageProvider
    ) {}

    public async execute({
        filename,
        userId,
    }: Request): Promise<AvatarResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new InvalidUserError();
        }

        const oldAvatar = user.avatar;

        // faz o upload do novo arquivo para o storage
        const currentPath = path.resolve(uploadConfig.tmpLocation, filename);
        await this.storageProvider.upload(currentPath, "avatar");

        // remove o avatar antigo do storage
        if (oldAvatar) {
            await this.storageProvider.delete(oldAvatar, "avatar");
        }

        // atualiza avatar do usuário no repositório
        await this.usersRepository.updateAvatar(user.id, filename);

        return {
            userId,
            avatar: filename,
            avatarURL: `${process.env.STATIC_URL_PREFIX}/avatar/${filename}`,
        };
    }
}
