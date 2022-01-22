import { UpdateAvatarUsecase } from ".";
import { DiskStorageProvider } from "../../../../core/providers/storage/implementations/disk-storage-provider";
import { TypeormUsersRepository } from "../../repositories/implementations/typeorm-users-repository";
import { UpdateAvatarController } from "./update-avatar-controller";

export function makeUpdateAvatarController(): UpdateAvatarController {
    const storageProvider = new DiskStorageProvider();
    const userRepository = new TypeormUsersRepository();
    const useCase = new UpdateAvatarUsecase(userRepository, storageProvider);
    const controller = new UpdateAvatarController(useCase);

    return controller;
}
