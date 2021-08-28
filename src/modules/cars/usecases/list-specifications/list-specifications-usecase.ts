import { Specification } from "../../models/specification";
import { SpecificationsRepository } from "../../repositories/specifications-repository";

export class ListSpecificationsUseCase {
    private repository: SpecificationsRepository;

    constructor(specificationsRepository: SpecificationsRepository) {
        this.repository = specificationsRepository;
    }

    async execute(): Promise<Specification[]> {
        return this.repository.list();
    }
}
