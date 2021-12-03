import { Entity } from "typeorm";

@Entity()
export class Specification {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}
