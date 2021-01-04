import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSample1604790882076 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'amostras',
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
                        name: 'descricao',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'especie',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'raca',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'sexo',
                        type: 'enum',
                        enum: ['masculino', 'feminino'],
                        isNullable: true,
                    },
                    {
                        name: 'idade',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'proprietario',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'flagTratamento',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'flagAcondicionada',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'observacao',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'dataRecebimento',
                        type: 'date',
                        isNullable: true,
                    },
                    {
                        name: 'valor',
                        type: 'real',
                        isNullable: true,
                    },
                    {
                        name: 'flagPago',
                        type: 'boolean',
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: 'numero',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'ano',
                        type: 'integer',
                        isNullable: false,
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
        await queryRunner.dropTable('amostras');
    }


}
