import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateCategoryTable1637719388848 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_categories",
                columns: [
                    new TableColumn({
                        name: "category_id",
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
        await queryRunner.dropTable("tb_categories");
    }
}
