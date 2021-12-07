import jwt from "jsonwebtoken";

import { TokenEncrypter } from "../../token-encrypter";

export class JwtEncrypter implements TokenEncrypter {
    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    public encrypt(value: string | Record<string, unknown>): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const generatedToken = jwt.sign(value, this.secret);
                resolve(generatedToken);
            } catch (error) {
                reject(error);
            }
        });
    }
}
