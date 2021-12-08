export interface TokenDecrypter {
    decrypt<T>(encryptedValue: string): Promise<T>;
}
