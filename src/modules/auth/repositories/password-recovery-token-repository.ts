import { PasswordRecoveryToken } from "../models/password-recovery-token";

export type CreatePasswordTokenDTO = {
    userId: string;
    expiresIn: Date;
};

export type InvalidateUserTokensDTO = {
    userId: string;
};

export interface PasswordRecoveryTokenRepository {
    createToken(data: CreatePasswordTokenDTO): Promise<PasswordRecoveryToken>;

    invalidateTokens(data: InvalidateUserTokensDTO): Promise<void>;

    findToken(tokenId: string): Promise<PasswordRecoveryToken>;

    markTokenAsUsed(tokenId: string): Promise<void>;
}
