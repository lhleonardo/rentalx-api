import { TypeormSpecificationsRepository } from "../../repositories/implementations/typeorm/typeorm-specifications-repository";
import { ListSpecificationsController } from "./list-specifications-controller";
import { ListSpecificationsUseCase } from "./list-specifications-usecase";

export function makeListSpecificationController(): ListSpecificationsController {
    const repository = new TypeormSpecificationsRepository();
    const usecase = new ListSpecificationsUseCase(repository);

    const controller = new ListSpecificationsController(usecase);

    return controller;
}
