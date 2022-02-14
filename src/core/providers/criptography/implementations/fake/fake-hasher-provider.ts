import { HasherProvider } from "../../hasher";

export class FakeHasherProvider implements HasherProvider {
    // apenas retorna o conteúdo recebido
    hash(content: string): Promise<string> {
        return new Promise((resolve) => resolve(content));
    }

    // verificação de strings puras
    compare(content: string, contentHashed: string): Promise<boolean> {
        return new Promise((resolve) => resolve(content === contentHashed));
    }
}
