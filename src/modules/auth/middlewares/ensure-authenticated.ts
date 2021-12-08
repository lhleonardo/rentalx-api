import { NextFunction, Request, Response } from "express";

import { APP_SECRET } from "../../../core/config/jwt";
import { JwtAdapter } from "../../../core/providers/criptography/implementations/jwt/jwt-adapter";
import { TokenDecrypter } from "../../../core/providers/criptography/token-decrypter";
import { TypeormUsersRepository } from "../../users/repositories/implementations/typeorm-users-repository";
import { UsersRepository } from "../../users/repositories/users-repository";
import { InvalidTokenError } from "../errors/invalid-token-error";
import { InvalidUserTokenError } from "../errors/invalid-user-token-error";
import { MissingTokenError } from "../errors/missing-token-error";

type DecodedPayload = {
    sub: string;
};

async function ensureAuthenticatedStub(
    decrypter: TokenDecrypter,
    userRepo: UsersRepository
) {
    return async function ensureAuthenticated(
        request: Request,
        _: Response,
        next: NextFunction
    ): Promise<void> {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new MissingTokenError();
        }

        const [, token] = authHeader.split(" ");

        let userId;
        try {
            const decrypted = await decrypter.decrypt<DecodedPayload>(token);
            userId = decrypted.sub;
        } catch {
            throw new InvalidTokenError();
        }

        const loggedUser = await userRepo.findById(userId);

        if (!loggedUser) {
            throw new InvalidUserTokenError();
        }

        request.userId = loggedUser.id;

        next();
    };
}

export default ensureAuthenticatedStub(
    new JwtAdapter(APP_SECRET),
    new TypeormUsersRepository()
);
