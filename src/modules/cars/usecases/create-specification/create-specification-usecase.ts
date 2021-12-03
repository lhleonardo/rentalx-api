import { BasicUsecase } from "../../../core/usecases/basic-service";
import { DuplicateSpecificationError } from "../../errors/duplicate-specification";
import { Specification } from "../../models/specification";
import { SpecificationsRepository } from "../../repositories/specifications-repository";

type Request = {
    name: string;
    description: string;
};

export class CreateSpecificationUseCase
    implements BasicUsecase<Request, Specification>
{
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
            throw new DuplicateSpecificationError(
                specificationAlreadyExists.name
            );
        }

        const specification = await this.repository.create({
            name,
            description,
        });

        return specification;
    }
}
