import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSusceptibilityTest1606335690042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'testes_suscetibilidade',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'patogeno_item_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'antimicrobiano_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'suscetibilidade',
                        type: 'enum',
                        enum: ['Resistente', 'Itermediário', 'Sensível'],
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
                        columnNames: ['patogeno_item_id'],
                        referencedTableName: 'patogenos_itens',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                    {
                        columnNames: ['antimicrobiano_id'],
                        referencedTableName: 'antimicrobianos',
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
