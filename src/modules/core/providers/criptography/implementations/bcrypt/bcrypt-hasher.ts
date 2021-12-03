import bcrypt from "bcrypt";

import { HasherProvider } from "../../hasher";

export class BCryptHasher implements HasherProvider {
    private readonly salt: number;

    constructor(salt: number) {
        this.salt = salt;
    }

    public async hash(content: string): Promise<string> {
        return bcrypt.hash(content, this.salt);
    }

    public async compare(
        content: string,
        contentHashed: string
    ): Promise<boolean> {
        return bcrypt.compare(content, contentHashed);
    }
}
