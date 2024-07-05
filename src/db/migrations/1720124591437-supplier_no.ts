import { MigrationInterface, QueryRunner } from 'typeorm';

export class SupplierNo1720124591437 implements MigrationInterface {
  name = 'SupplierNo1720124591437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "raw_material" DROP COLUMN "supplier"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "raw_material" ADD "supplier" character varying(255)`,
    );
  }
}
