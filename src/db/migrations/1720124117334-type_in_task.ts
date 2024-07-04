import { MigrationInterface, QueryRunner } from "typeorm";

export class TypeInTask1720124117334 implements MigrationInterface {
    name = 'TypeInTask1720124117334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "type"`);
    }

}
