import { InMemorySpecificationsRepository } from "../../repositories/implementations/in-memory-specifications-repository";
import { CreateSpecificationController } from "./create-specification-controller";
import { CreateSpecificationUseCase } from "./create-specification-usecase";

export function makeCreateSpecificationController(): CreateSpecificationController {
    const repository = InMemorySpecificationsRepository.getInstance();

    const usecase = new CreateSpecificationUseCase(repository);
    const controller = new CreateSpecificationController(usecase);

    return controller;
}
