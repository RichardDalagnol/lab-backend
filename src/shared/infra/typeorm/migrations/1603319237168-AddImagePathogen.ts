import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddImagePathogen1603319237168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'patogenos',
            new TableColumn({
                name: 'imagem',
                type: 'varchar',
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('patogenos', 'imagem')
    }

}
