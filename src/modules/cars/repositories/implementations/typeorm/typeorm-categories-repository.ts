import { getRepository, Repository } from "typeorm";

import { Category } from "../../../models/category";
import {
    CategoriesRepository,
    CreateCategoryDTO,
} from "../../categories-repository";

export class TypeormCategoriesRepository implements CategoriesRepository {
    private readonly externalRepo: Repository<Category>;

    constructor() {
        this.externalRepo = getRepository(Category);
    }

    public create({ name, description }: CreateCategoryDTO): Promise<Category> {
        const object = this.externalRepo.create({ name, description });

        return this.externalRepo.save(object);
    }

    public list(): Promise<Category[]> {
        return this.externalRepo.find({});
    }

    public findByName(name: string): Promise<Category> {
        return this.externalRepo.findOne({ name });
    }
}
