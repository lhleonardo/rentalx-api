import { InMemoryCategoriesRepository } from "../../repositories/implementations/in-memory-categories-repository";
import { CreateCategoryController } from "./create-category-controller";
import { CreateCategoryUseCase } from "./create-category-usecase";

export function makeCreateCategoryController(): CreateCategoryController {
    const repository = new InMemoryCategoriesRepository();

    const usecase = new CreateCategoryUseCase(repository);
    const controller = new CreateCategoryController(usecase);

    return controller;
}
