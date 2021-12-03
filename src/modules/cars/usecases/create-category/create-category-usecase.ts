import { AppError } from "../../../../errors/app-error";
import { BasicUsecase } from "../../../core/usecases/basic-service";
import { Category } from "../../models/category";
import { CategoriesRepository } from "../../repositories/categories-repository";

type Request = {
    name: string;
    description: string;
};

export class CreateCategoryUseCase implements BasicUsecase<Request, Category> {
    private categoriesRepository: CategoriesRepository;

    constructor(categoriesRepository: CategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public async execute(request: Request): Promise<Category> {
        const { name, description } = request;

        const categoryExists = await this.categoriesRepository.findByName(name);

        if (categoryExists) {
            throw new AppError("Category already exists");
        }

        const newCategory = await this.categoriesRepository.create({
            name,
            description,
        });

        return newCategory;
    }
}
