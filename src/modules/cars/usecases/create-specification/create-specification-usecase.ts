import { AppError } from "../../../../errors/app-error";
import { Specification } from "../../models/specification";
import { SpecificationsRepository } from "../../repositories/specifications-repository";

type Request = {
    name: string;
    description: string;
};

export class CreateSpecificationUseCase {
    private repository: SpecificationsRepository;

    constructor(specificationsRepository: SpecificationsRepository) {
        this.repository = specificationsRepository;
    }

    async execute(data: Request): Promise<Specification> {
        const { name, description } = data;

        if (this.existsSpecification(name)) {
            throw new AppError("Specification already exists");
        }

        const specification = await this.repository.create({
            name,
            description,
        });

        return specification;
    }

    private async existsSpecification(name: string): Promise<boolean> {
        return !!this.repository.findByName(name);
    }
}
