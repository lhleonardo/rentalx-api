import { getRepository, Repository } from "typeorm";

import { Specification } from "../../../models/specification";
import {
    CreateSpecificationDTO,
    SpecificationsRepository,
} from "../../specifications-repository";

export class TypeormSpecificationsRepository
    implements SpecificationsRepository
{
    private readonly externalRepo: Repository<Specification>;

    constructor() {
        this.externalRepo = getRepository(Specification);
    }

    public create({
        name,
        description,
    }: CreateSpecificationDTO): Promise<Specification> {
        const object = this.externalRepo.create({ name, description });

        return this.externalRepo.save(object);
    }

    public list(): Promise<Specification[]> {
        return this.externalRepo.find({});
    }

    public findByName(name: string): Promise<Specification> {
        return this.externalRepo.findOne({ name });
    }
}
