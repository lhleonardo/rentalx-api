import { HASH_SALT } from "../../../../core/config/hash";
import { BCryptHasher } from "../../../../core/providers/criptography/implementations/bcrypt/bcrypt-hasher";
import { TypeormUsersRepository } from "../../repositories/implementations/typeorm-users-repository";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUsecase } from "./create-user-usecase";

export function makeCreateUserController(): CreateUserController {
    const hasherProvider = new BCryptHasher(HASH_SALT);
    const repository = new TypeormUsersRepository();
    const usecase = new CreateUserUsecase(repository, hasherProvider);
    const controller = new CreateUserController(usecase);

    return controller;
}
