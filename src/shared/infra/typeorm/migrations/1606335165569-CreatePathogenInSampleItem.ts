import { MigrationInterface, Table, QueryRunner } from "typeorm";

export class CreatePathogenInSampleItem1606335165569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'patogenos_itens',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'amostra_item_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'patogeno_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['patogeno_id'],
                        referencedTableName: 'patogenos',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                    {
                        columnNames: ['amostra_item_id'],
                        referencedTableName: 'amostras_itens',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('patogenos_itens');
    }

}
