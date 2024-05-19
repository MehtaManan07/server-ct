import { MigrationInterface, QueryRunner } from "typeorm";

export class RawMaterials1716131269375 implements MigrationInterface {
    name = 'RawMaterials1716131269375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "pricePerUnit"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "supplier"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "packetsAvailable" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "unit" character varying NOT NULL DEFAULT 'mm'`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "weightPerUnit" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "totalWeight" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "totalWeight"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "weightPerUnit"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "packetsAvailable"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "supplier" character varying`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "pricePerUnit" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "quantity" integer`);
    }

}
