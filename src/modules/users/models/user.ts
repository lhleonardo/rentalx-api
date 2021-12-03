import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tb_users")
export class User {
    @PrimaryColumn({ name: "user_id", type: "uuid" })
    id?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    admin: boolean;

    @Column()
    avatar?: string;

    @Column({ name: "driver_license" })
    driverLicense?: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
