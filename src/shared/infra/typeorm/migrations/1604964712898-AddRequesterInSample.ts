import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddRequesterInSample1604964712898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(
            'amostras',
            new TableColumn({
                name: 'requisitante_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'amostras',
            new TableForeignKey({
                name: 'Requisitante',
                columnNames: ['requisitante_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'requisitantes',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('amostras', 'Requisitante');

        await queryRunner.dropColumn('amostras', 'requisitante_id');
    }

}
