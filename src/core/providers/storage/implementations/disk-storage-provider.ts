import fs from "fs";
import path from "path";

import uploadConfig from "../../../config/upload";
import { StorageProvider } from "../storage-provider";

export class DiskStorageProvider implements StorageProvider {
    private readonly pwd: string;

    constructor() {
        this.pwd = uploadConfig.uploadFolder;
    }

    public async upload(filePath: string, container: string): Promise<void> {
        const checkFileExists = await fs.promises.stat(filePath);

        if (!checkFileExists) {
            throw new Error("File not found");
        }

        const newPath = path.resolve(
            this.pwd,
            container,
            path.basename(filePath)
        );

        await fs.promises.rename(filePath, newPath);
    }

    public async delete(filename: string, container: string): Promise<void> {
        const pathToDelete = path.join(this.pwd, container, filename);
        const checkFileExists = await this.checkFileExists(pathToDelete);

        if (checkFileExists) {
            await fs.promises.unlink(pathToDelete);
        }
    }

    private async checkFileExists(path: string): Promise<boolean> {
        try {
            await fs.promises.access(path);
            return true;
        } catch {
            return false;
        }
    }
}
