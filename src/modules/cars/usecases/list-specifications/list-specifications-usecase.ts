import { BasicUsecase } from "../../../core/usecases/basic-service";
import { Specification } from "../../models/specification";
import { SpecificationsRepository } from "../../repositories/specifications-repository";

export class ListSpecificationsUseCase
    implements BasicUsecase<void, Specification[]>
{
    private repository: SpecificationsRepository;

    constructor(specificationsRepository: SpecificationsRepository) {
        this.repository = specificationsRepository;
    }

    async execute(): Promise<Specification[]> {
        return this.repository.list();
    }
}
