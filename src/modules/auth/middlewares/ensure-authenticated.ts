import { NextFunction, Request, Response } from "express";

import { APP_SECRET } from "../../../core/config/jwt";
import { JwtAdapter } from "../../../core/providers/criptography/implementations/jwt/jwt-adapter";
import { TypeormUsersRepository } from "../../users/repositories/implementations/typeorm-users-repository";
import { InvalidTokenError } from "../errors/invalid-token-error";
import { InvalidUserTokenError } from "../errors/invalid-user-token-error";
import { MissingTokenError } from "../errors/missing-token-error";

type DecodedPayload = {
    sub: string;
};

export default async function ensureAuthenticated(
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
    const decrypter = new JwtAdapter(APP_SECRET);
    const userRepo = new TypeormUsersRepository();

    try {
        const decrypted = await decrypter.decrypt<DecodedPayload>(token);
        console.log(decrypted);
        userId = decrypted;
    } catch {
        throw new InvalidTokenError();
    }

    const loggedUser = await userRepo.findById(userId);

    if (!loggedUser) {
        throw new InvalidUserTokenError();
    }

    request.userId = loggedUser.id;

    next();
}
