import { BasicController } from "../../../core/controllers/basic-controller";
import { InMemoryCategoriesRepository } from "../../repositories/implementations/in-memory-categories-repository";
import { ImportCategoryController } from "./import-category-controller";
import { ImportCategoryUseCase } from "./import-category-usecase";

export function makeImportCategoryController(): BasicController {
    const repository = InMemoryCategoriesRepository.getInstance();

    const useCase = new ImportCategoryUseCase(repository);

    const controller = new ImportCategoryController(useCase);

    return controller;
}
