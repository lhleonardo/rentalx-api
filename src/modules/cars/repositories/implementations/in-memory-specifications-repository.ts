import { v4 as uuid } from "uuid";

import { Specification } from "../../models/specification";
import {
    CreateSpecificationDTO,
    SpecificationsRepository,
} from "../specifications-repository";

export class InMemorySpecificationsRepository
    implements SpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    async create({
        name,
        description,
    }: CreateSpecificationDTO): Promise<Specification> {
        const specification: Specification = {
            id: uuid(),
            name,
            description,
            createdAt: new Date(),
        };

        this.specifications.push(specification);

        return specification;
    }

    async list(): Promise<Specification[]> {
        return [...this.specifications];
    }

    async findByName(name: string): Promise<Specification | undefined> {
        const result = this.specifications.find(
            (specification) => specification.name === name
        );

        return result;
    }
}
