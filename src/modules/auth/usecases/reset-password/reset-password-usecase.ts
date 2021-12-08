import { isAfter } from "date-fns";
import { validate } from "uuid";

import { HasherProvider } from "../../../../core/providers/criptography/hasher";
import { BasicUsecase } from "../../../../core/usecases/basic-service";
import { ConfirmPasswordError } from "../../../../shared/errors/confirm-password-error";
import { UsersRepository } from "../../../users/repositories/users-repository";
import { InvalidResetTokenError } from "../../errors/invalid-reset-token-error";
import { PasswordRecoveryTokenRepository } from "../../repositories/password-recovery-token-repository";

type Request = {
    token: string;
    password: string;
    confirmPassword: string;
};

export class ResetPasswordUsecase implements BasicUsecase<Request, void> {
    private tokenRepository: PasswordRecoveryTokenRepository;
    private userRepository: UsersRepository;
    private hasherProvider: HasherProvider;

    constructor(
        tokenRepository: PasswordRecoveryTokenRepository,
        userRepository: UsersRepository,
        hasherProvider: HasherProvider
    ) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.hasherProvider = hasherProvider;
    }

    public async execute({
        token,
        password,
        confirmPassword,
    }: Request): Promise<void> {
        const tokenIsValid = validate(token);

        if (!tokenIsValid) {
            throw new InvalidResetTokenError();
        }

        const tokenInfo = await this.tokenRepository.findToken(token);
        console.log(tokenInfo.expiresIn);
        console.log(new Date());
        console.log(isAfter(tokenInfo.expiresIn, new Date()));

        // token inativo ou já expirado
        if (!tokenInfo.active || isAfter(new Date(), tokenInfo.expiresIn)) {
            throw new InvalidResetTokenError();
        }

        if (password !== confirmPassword) {
            throw new ConfirmPasswordError();
        }

        const hashedPassword = await this.hasherProvider.hash(password);

        await this.userRepository.updatePassword(
            tokenInfo.userId,
            hashedPassword
        );

        await this.tokenRepository.markTokenAsUsed(token);
    }
}
