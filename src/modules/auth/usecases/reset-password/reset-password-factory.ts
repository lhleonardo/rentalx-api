import { HASH_SALT } from "../../../../core/config/hash";
import { BCryptHasher } from "../../../../core/providers/criptography/implementations/bcrypt/bcrypt-hasher";
import { TypeormUsersRepository } from "../../../users/repositories/implementations/typeorm-users-repository";
import { TypeormPasswordRecoveryTokenRepository } from "../../repositories/implementations/typeorm-password-recovery-token-repository";
import { ResetPasswordController } from "./reset-password-controller";
import { ResetPasswordUsecase } from "./reset-password-usecase";

export function makeResetPasswordController(): ResetPasswordController {
    const tokenRepo = new TypeormPasswordRecoveryTokenRepository();
    const userRepo = new TypeormUsersRepository();
    const hashProvider = new BCryptHasher(HASH_SALT);
    const usecase = new ResetPasswordUsecase(tokenRepo, userRepo, hashProvider);
    const controller = new ResetPasswordController(usecase);

    return controller;
}
