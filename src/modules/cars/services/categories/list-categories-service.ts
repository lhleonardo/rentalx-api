import { Category } from "../../models/category";
import { CategoriesRepository } from "../../repositories/categories-repository";

export class ListCategoriesService {
    private categoriesRepository: CategoriesRepository;

    constructor(categoriesRepository: CategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}
