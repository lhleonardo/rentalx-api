import { Category } from "../../../models/category";
import { CategoriesRepository, CreateCategoryDTO } from "../../categories-repository";

import {v4 as uuid} from "uuid"

export class FakeCategoriesRepository implements CategoriesRepository {

    private data: Category[] = []

    async create(data: CreateCategoryDTO): Promise<Category> {
        const newCategory: Category = {
            name: data.name,
            description: data.description,
            id: uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.data.push(newCategory);

        return newCategory;
    }
    
    async list(): Promise<Category[]> {
        return [...this.data]
    }

    async findByName(name: string): Promise<Category> {
        const element = this.data.find(category => category.name === name);

        return element;
    }

}