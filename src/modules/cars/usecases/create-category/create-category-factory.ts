import { TypeormCategoriesRepository } from "../../repositories/implementations/typeorm/typeorm-categories-repository";
import { CreateCategoryController } from "./create-category-controller";
import { CreateCategoryUseCase } from "./create-category-usecase";

export function makeCreateCategoryController(): CreateCategoryController {
    const repository = new TypeormCategoriesRepository();

    const usecase = new CreateCategoryUseCase(repository);
    const controller = new CreateCategoryController(usecase);

    return controller;
}
