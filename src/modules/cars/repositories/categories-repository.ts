import { v4 as uuid } from "uuid";

import { Category } from "../models/category";

type CreateCategoryDTO = {
    name: string;
    description: string;
};

export class CategoriesRepository {
    private categories: Category[];

    constructor() {
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

    public async findByName(name: string): Promise<boolean> {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return !!category;
    }
}
