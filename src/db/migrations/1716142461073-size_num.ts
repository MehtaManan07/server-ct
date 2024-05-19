import { MigrationInterface, QueryRunner } from "typeorm";

export class SizeNum1716142461073 implements MigrationInterface {
    name = 'SizeNum1716142461073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "size" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5" UNIQUE ("name", "size")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "size" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5" UNIQUE ("size", "name")`);
    }

}
