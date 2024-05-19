import { MigrationInterface, QueryRunner } from "typeorm";

export class RawMaterialsSchema1716142266438 implements MigrationInterface {
    name = 'RawMaterialsSchema1716142266438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" RENAME COLUMN "category" TO "categories"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "categories"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "categories" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5" UNIQUE ("name", "size")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "categories"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "categories" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_material" RENAME COLUMN "categories" TO "category"`);
    }

}
