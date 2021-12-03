import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateSpecificationsTable1638492468000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specifications",
                columns: [
                    new TableColumn({
                        name: "specification_id",
                        type: "uuid",
                        isPrimary: true,
                    }),
                    new TableColumn({ name: "name", type: "varchar" }),
                    new TableColumn({ name: "description", type: "varchar" }),
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
        await queryRunner.dropTable("specifications");
    }
}
