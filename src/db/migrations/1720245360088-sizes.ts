import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sizes1720245360088 implements MigrationInterface {
  name = 'Sizes1720245360088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ready_product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "shape" character varying(100) NOT NULL, "color" character varying(100) NOT NULL, "size" character varying(100) NOT NULL, "quantity" integer NOT NULL, "imageUrl" character varying(255) NOT NULL, "slug" character varying(100) NOT NULL, "taskId" integer NOT NULL, CONSTRAINT "UQ_cb713fbc210a1cd62ac5229d428" UNIQUE ("slug"), CONSTRAINT "PK_fdfe81d56fdd20fcc64770b5985" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "unit"`);
    await queryRunner.query(
      `ALTER TABLE "raw_material" DROP CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5"`,
    );
    await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "size"`);
    await queryRunner.query(
      `ALTER TABLE "raw_material" ADD "size" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "raw_material" ADD CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5" UNIQUE ("name", "size")`,
    );
    await queryRunner.query(
      `ALTER TABLE "ready_product" ADD CONSTRAINT "FK_e66a7735f42932dc94c73320518" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ready_product" DROP CONSTRAINT "FK_e66a7735f42932dc94c73320518"`,
    );
    await queryRunner.query(
      `ALTER TABLE "raw_material" DROP CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5"`,
    );
    await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "size"`);
    await queryRunner.query(
      `ALTER TABLE "raw_material" ADD "size" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "raw_material" ADD CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5" UNIQUE ("name", "size")`,
    );
    await queryRunner.query(
      `ALTER TABLE "raw_material" ADD "unit" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "ready_product"`);
  }
}
