import { BasicUsecase } from "../../../core/usecases/basic-service";
import { Category } from "../../models/category";
import { CategoriesRepository } from "../../repositories/categories-repository";

export class ListCategoriesUseCase implements BasicUsecase<void, Category[]> {
    private categoriesRepository: CategoriesRepository;

    constructor(categoriesRepository: CategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}
