import { diskStorage, StorageEngine } from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const tmpFolder = path.join(__dirname, "..", "..", "..", "tmp");
const uploadsFolder = path.join(tmpFolder, "uploads");

type UploadOptions = {
    driver: "disk";

    tmpLocation: string;
    uploadFolder: string;

    multer: {
        storage: StorageEngine;
    };
};

const uploadConfig: UploadOptions = {
    driver: "disk",
    tmpLocation: tmpFolder,
    uploadFolder: uploadsFolder,

    multer: {
        storage: diskStorage({
            destination: tmpFolder,
            filename: (request, file, callback) =>
                callback(null, `${uuid()}-${file.originalname}`),
        }),
    },
};

export default uploadConfig;
