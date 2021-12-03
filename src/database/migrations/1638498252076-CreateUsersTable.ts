import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateUsersTable1638498252076 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_users",
                columns: [
                    new TableColumn({
                        name: "user_id",
                        type: "uuid",
                        isPrimary: true,
                    }),
                    new TableColumn({ name: "name", type: "varchar" }),
                    new TableColumn({ name: "password", type: "varchar" }),
                    new TableColumn({
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    }),
                    new TableColumn({
                        name: "driver_license",
                        type: "varchar",
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: "avatar",
                        type: "varchar",
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: "admin",
                        type: "boolean",
                        default: false,
                    }),
                    new TableColumn({
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }),
                    new TableColumn({
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    }),
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_users");
    }
}
