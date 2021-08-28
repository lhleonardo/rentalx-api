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

        const specificationAlreadyExists = await this.repository.findByName(
            name
        );

        if (specificationAlreadyExists) {
            throw new AppError("Specification already exists");
        }

        const specification = await this.repository.create({
            name,
            description,
        });

        return specification;
    }
}
