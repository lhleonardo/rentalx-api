export interface TokenEncrypter {
    // mesma coisa que object é usar Record<string, unknown>
    encrypt(value: string | Record<string, unknown>): Promise<string>;
}
