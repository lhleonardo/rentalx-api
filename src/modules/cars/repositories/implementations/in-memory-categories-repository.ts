import { v4 as uuid } from "uuid";

import { Category } from "../../models/category";
import {
    CategoriesRepository,
    CreateCategoryDTO,
} from "../categories-repository";

export class InMemoryCategoriesRepository implements CategoriesRepository {
    private categories: Category[];

    private static INSTANCE: InMemoryCategoriesRepository;

    public static getInstance(): InMemoryCategoriesRepository {
        if (!this.INSTANCE) {
            this.INSTANCE = new InMemoryCategoriesRepository();
        }

        return this.INSTANCE;
    }

    private constructor() {
        this.categories = [];
    }

    public async create(data: CreateCategoryDTO): Promise<Category> {
        const { name, description } = data;

        const newCategory: Category = {
            id: uuid(),
            name,
            description,
            createdAt: new Date(),
        };

        this.categories.push(newCategory);

        return newCategory;
    }

    public async list(): Promise<Category[]> {
        return this.categories;
    }

    public async findByName(name: string): Promise<Category | undefined> {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category;
    }
}
