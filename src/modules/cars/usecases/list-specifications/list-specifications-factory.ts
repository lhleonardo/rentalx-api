import { InMemorySpecificationsRepository } from "../../repositories/implementations/in-memory-specifications-repository";
import { ListSpecificationsController } from "./list-specifications-controller";
import { ListSpecificationsUseCase } from "./list-specifications-usecase";

export function makeListSpecificationController(): ListSpecificationsController {
    const repository = InMemorySpecificationsRepository.getInstance();
    const usecase = new ListSpecificationsUseCase(repository);

    const controller = new ListSpecificationsController(usecase);

    return controller;
}
