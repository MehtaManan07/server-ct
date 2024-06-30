import { MigrationInterface, QueryRunner } from 'typeorm';

export class Parentcategory1719745906567 implements MigrationInterface {
  name = 'Parentcategory1719745906567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'MANAGER', 'JOBBER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'JOBBER', "contactInfo" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "jobberId" integer NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task_to_material" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "rawMaterialId" integer NOT NULL, "taskId" integer NOT NULL, "quantityUsed" integer NOT NULL, CONSTRAINT "PK_d3340a72642c899c98bb296891c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "name" character varying(255) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "raw_material" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "name" character varying(255) NOT NULL, "packetsAvailable" integer NOT NULL, "unit" character varying(255) NOT NULL, "size" integer NOT NULL, "categories" text array NOT NULL, "weightPerUnit" integer NOT NULL, "totalWeight" integer NOT NULL, "slug" character varying(255) NOT NULL, "color" character varying(255), "parentCategoryId" integer, CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5" UNIQUE ("name", "size"), CONSTRAINT "PK_78620c6a699438f30545519c86b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_336756154d5a882b42a01136093" FOREIGN KEY ("jobberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_to_material" ADD CONSTRAINT "FK_4be34fa598b88463aa9e8edb1e0" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_to_material" ADD CONSTRAINT "FK_af88e587b848ba5853664b13c31" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "raw_material" ADD CONSTRAINT "FK_1ac2d6cfc8a9aa4e1cecc683db8" FOREIGN KEY ("parentCategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "raw_material" DROP CONSTRAINT "FK_1ac2d6cfc8a9aa4e1cecc683db8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_to_material" DROP CONSTRAINT "FK_af88e587b848ba5853664b13c31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_to_material" DROP CONSTRAINT "FK_4be34fa598b88463aa9e8edb1e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_336756154d5a882b42a01136093"`,
    );
    await queryRunner.query(`DROP TABLE "raw_material"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "task_to_material"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
