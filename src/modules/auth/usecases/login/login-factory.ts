import { HASH_SALT } from "../../../../core/config/hash";
import { APP_SECRET } from "../../../../core/config/jwt";
import { BCryptHasher } from "../../../../core/providers/criptography/implementations/bcrypt/bcrypt-hasher";
import { JwtEncrypter } from "../../../../core/providers/criptography/implementations/jwt/jwt-encrypter";
import { TypeormUsersRepository } from "../../../users/repositories/implementations/typeorm-users-repository";
import { LoginController } from "./login-controller";
import { LoginUseCase } from "./login-usecase";

export function makeLoginController(): LoginController {
    const userRepo = new TypeormUsersRepository();
    const hashManager = new BCryptHasher(HASH_SALT);
    const tokenGenerator = new JwtEncrypter(APP_SECRET);

    const usecase = new LoginUseCase(userRepo, hashManager, tokenGenerator);
    const controller = new LoginController(usecase);

    return controller;
}
