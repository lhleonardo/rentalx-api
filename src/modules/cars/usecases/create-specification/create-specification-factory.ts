import { TypeormSpecificationsRepository } from "../../repositories/implementations/typeorm/typeorm-specifications-repository";
import { CreateSpecificationController } from "./create-specification-controller";
import { CreateSpecificationUseCase } from "./create-specification-usecase";

export function makeCreateSpecificationController(): CreateSpecificationController {
    const repository = new TypeormSpecificationsRepository();

    const usecase = new CreateSpecificationUseCase(repository);
    const controller = new CreateSpecificationController(usecase);

    return controller;
}
