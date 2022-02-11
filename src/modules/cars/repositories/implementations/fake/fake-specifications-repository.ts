
import { v4 as uuid } from "uuid"
import { Specification } from "../../../models/specification";
import { CreateSpecificationDTO, SpecificationsRepository } from "../../specifications-repository";

export class FakeSpecificationsRepository implements SpecificationsRepository {

    private data: Specification[] = []

    async create(data: CreateSpecificationDTO): Promise<Specification> {
        const newSpecification: Specification = {
            name: data.name,
            description: data.description,
            id: uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.data.push(newSpecification);

        return newSpecification;
    }

    async list(): Promise<Specification[]> {
        return [...this.data]
    }

    async findByName(name: string): Promise<Specification> {
        const element = this.data.find(specification => specification.name === name);

        return element;
    }

}