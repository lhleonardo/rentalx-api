import csvParser from "csv-parse";
import fs from "fs";

import { CategoriesRepository } from "../../repositories/categories-repository";

type CategoryExtracted = {
    name: string;
    description: string;
};

export class ImportCategoryUseCase {
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

            parser.on("end", () => resolve(categories));

            parser.on("error", (err) => reject(err));
        });
    }

    public async execute(file: Express.Multer.File): Promise<void> {
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
