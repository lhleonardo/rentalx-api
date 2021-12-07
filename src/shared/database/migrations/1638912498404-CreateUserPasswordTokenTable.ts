import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class CreateUserPasswordTokenTable1638912498404
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_users_password_token",
                columns: [
                    new TableColumn({
                        name: "token_id",
                        type: "uuid",
                        isPrimary: true,
                    }),
                    new TableColumn({
                        name: "user_id",
                        type: "uuid",
                    }),
                    new TableColumn({
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }),
                    new TableColumn({ name: "expires_in", type: "timestamp" }),
                    new TableColumn({
                        name: "used",
                        type: "boolean",
                        default: false,
                    }),
                    new TableColumn({
                        name: "active",
                        type: "boolean",
                        default: true,
                    }),
                ],
            })
        );

        await queryRunner.createForeignKey(
            "tb_users_password_token",
            new TableForeignKey({
                columnNames: ["user_id"],
                name: "fk_user_password_token",
                referencedTableName: "tb_users",
                referencedColumnNames: ["user_id"],
                onDelete: "cascade",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_users_password_token");
    }
}
