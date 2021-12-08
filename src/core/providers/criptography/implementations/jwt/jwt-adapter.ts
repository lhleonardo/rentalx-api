import jwt from "jsonwebtoken";

import { TokenDecrypter } from "../../token-decrypter";
import { TokenEncrypter } from "../../token-encrypter";

export class JwtAdapter implements TokenEncrypter, TokenDecrypter {
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

    public decrypt<T>(encryptedValue: string): Promise<T> {
        return new Promise((resolve, reject) => {
            try {
                const decrypted = jwt.verify(encryptedValue, this.secret);
                resolve(decrypted as T);
            } catch (error) {
                reject(error);
            }
        });
    }
}
