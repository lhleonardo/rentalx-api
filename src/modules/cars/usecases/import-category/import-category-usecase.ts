import csvParser from "csv-parse";
import fs from "fs";

import { BasicUsecase } from "../../../../core/usecases/basic-service";
import { CategoriesRepository } from "../../repositories/categories-repository";

type CategoryExtracted = {
    name: string;
    description: string;
};

type Request = {
    file: Express.Multer.File;
};

export class ImportCategoryUseCase implements BasicUsecase<Request, void> {
    private repository: CategoriesRepository;

    constructor(repository: CategoriesRepository) {
        this.repository = repository;
    }

    private async loadCategories(
        file: Express.Multer.File
    ): Promise<CategoryExtracted[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);

            const categories: CategoryExtracted[] = [];

            const parser = csvParser({ delimiter: "," });

            stream.pipe(parser);

            parser.on("data", async (line) => {
                const [name, description] = line;

                categories.push({ name, description });
            });

            parser.on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            });

            parser.on("error", (err) => {
                fs.promises.unlink(file.path);
                reject(err);
            });
        });
    }

    public async execute({ file }: Request): Promise<void> {
        const categories: CategoryExtracted[] = await this.loadCategories(file);

        categories.forEach(async (category) => {
            const { name, description } = category;

            const categoryAlreadyExists = await this.repository.findByName(
                name
            );

            if (!categoryAlreadyExists) {
                await this.repository.create({ name, description });
            }
        });
    }
}
