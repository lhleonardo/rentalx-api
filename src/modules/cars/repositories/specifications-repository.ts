import { Specification } from "../models/specification";

export type CreateSpecificationDTO = {
    name: string;
    description: string;
};
export interface SpecificationsRepository {
    create(data: CreateSpecificationDTO): Promise<Specification>;

    list(): Promise<Specification[]>;

    findByName(name: string): Promise<Specification | undefined>;
}
