export interface HasherProvider {
    /**
     * Realiza o hash de um determinado conteúdo.
     *
     * @param content conteúdo que será hasheado
     */
    hash(content: string): Promise<string>;

    /**
     * Compara se um texto livre é o fator originador
     * de um determinado conteúdo hasheado.
     *
     * @param content conteudo original
     * @param contentHashed conteúdo hasheado
     */
    compare(content: string, contentHashed: string): Promise<boolean>;
}
