import { InMemoryCategoriesRepository } from "../../repositories/implementations/in-memory-categories-repository";
import { ListCategoriesController } from "./list-categories-controller";
import { ListCategoriesUseCase } from "./list-categories-usecase";

export function makeListCategoriesController(): ListCategoriesController {
    const repository = new InMemoryCategoriesRepository();

    const usecase = new ListCategoriesUseCase(repository);
    const controller = new ListCategoriesController(usecase);

    return controller;
}
