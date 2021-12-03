import { BasicController } from "../../../core/controllers/basic-controller";
import { TypeormCategoriesRepository } from "../../repositories/implementations/typeorm/typeorm-categories-repository";
import { ImportCategoryController } from "./import-category-controller";
import { ImportCategoryUseCase } from "./import-category-usecase";

export function makeImportCategoryController(): BasicController {
    const repository = new TypeormCategoriesRepository();

    const useCase = new ImportCategoryUseCase(repository);

    const controller = new ImportCategoryController(useCase);

    return controller;
}
