import { MigrationInterface, QueryRunner } from "typeorm";

export class Supplier1720124397014 implements MigrationInterface {
    name = 'Supplier1720124397014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "supplier" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "supplier"`);
    }

}
