import { getRepository, Repository } from "typeorm";

import { PasswordRecoveryToken } from "../../models/password-recovery-token";
import {
    CreatePasswordTokenDTO,
    InvalidateUserTokensDTO,
    PasswordRecoveryTokenRepository,
} from "../password-recovery-token-repository";

export class TypeormPasswordRecoveryTokenRepository
    implements PasswordRecoveryTokenRepository
{
    private externalRepo: Repository<PasswordRecoveryToken>;

    constructor() {
        this.externalRepo = getRepository(PasswordRecoveryToken);
    }

    public async createToken({
        userId,
        expiresIn,
    }: CreatePasswordTokenDTO): Promise<PasswordRecoveryToken> {
        // invalida os tokens já existentes
        await this.invalidateTokens({ userId });
        const newToken = this.externalRepo.create({
            used: false,
            userId,
            expiresIn,
            active: true,
        });

        // adiciona o token no banco de dados
        return this.externalRepo.save(newToken);
    }

    public async invalidateTokens({
        userId,
    }: InvalidateUserTokensDTO): Promise<void> {
        await this.externalRepo.update({ userId }, { active: false });
    }
}
