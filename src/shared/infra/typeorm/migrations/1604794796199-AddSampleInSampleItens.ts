import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddSampleInSampleItens1604794796199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(
            'amostras_itens',
            new TableColumn({
                name: 'amostra_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'amostras_itens',
            new TableForeignKey({
                name: 'AmostraItem',
                columnNames: ['amostra_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'amostras',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('amostras_itens', 'AmostraItem');

        await queryRunner.dropColumn('amostras_itens', 'amostra_id');
    }

}
