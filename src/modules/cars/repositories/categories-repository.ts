import { Category } from "../models/category";

export type CreateCategoryDTO = {
    name: string;
    description: string;
};
export interface CategoriesRepository {
    create(data: CreateCategoryDTO): Promise<Category>;

    list(): Promise<Category[]>;

    findByName(name: string): Promise<Category | undefined>;
}
