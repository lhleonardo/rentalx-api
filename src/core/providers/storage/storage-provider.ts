export interface StorageProvider {
    upload(filePath: string, container: string): Promise<void>;

    delete(filename: string, container: string): Promise<void>;
}
