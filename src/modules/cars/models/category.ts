import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "tb_categories" })
export class Category {
    @PrimaryColumn({ name: "category_id", type: "uuid" })
    id: string;

    @Column()
    name: string;
    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
