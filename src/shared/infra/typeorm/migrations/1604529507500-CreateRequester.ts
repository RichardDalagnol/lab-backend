import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRequester1604529507500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'requisitantes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isNullable: false,
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'rua',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'bairro',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cidade',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'numero',
                        type: 'integer',
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('requisitantes');
    }

}
