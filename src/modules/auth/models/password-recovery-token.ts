import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "../../users/models/user";

@Entity("tb_users_password_token")
export class PasswordRecoveryToken {
    @PrimaryColumn({ name: "token_id", type: "uuid" })
    id?: string;

    @Column({ name: "expires_in", type: "timestamp" })
    expiresIn: Date;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Column({ type: "boolean", default: false })
    used: boolean;

    // @ManyToOne(() => User)
    // user: User;

    @Column({ name: "user_id", type: "uuid" })
    userId: string;

    @Column({ name: "active", type: "boolean", default: true })
    active: boolean;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
