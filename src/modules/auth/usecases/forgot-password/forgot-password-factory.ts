import { TypeormUsersRepository } from "../../../users/repositories/implementations/typeorm-users-repository";
import { TypeormPasswordRecoveryTokenRepository } from "../../repositories/implementations/typeorm-password-recovery-token-repository";
import { ForgotPasswordController } from "./forgot-password-controller";
import { ForgotPasswordUsecase } from "./forgot-password-usecase";

export function makeForgotPasswordController(): ForgotPasswordController {
    const usersRepository = new TypeormUsersRepository();
    const tokenRecoveryRepository =
        new TypeormPasswordRecoveryTokenRepository();

    const usecase = new ForgotPasswordUsecase(
        usersRepository,
        tokenRecoveryRepository
    );
    const controller = new ForgotPasswordController(usecase);

    return controller;
}
