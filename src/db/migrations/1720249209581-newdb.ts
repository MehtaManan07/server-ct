import { MigrationInterface, QueryRunner } from 'typeorm';

export class Newdb1720249209581 implements MigrationInterface {
  name = 'Newdb1720249209581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'MANAGER', 'JOBBER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'JOBBER', "contactInfo" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ready_product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "shape" character varying(100) NOT NULL, "color" character varying(100) NOT NULL, "size" character varying(100) NOT NULL, "quantity" integer NOT NULL, "imageUrl" character varying(255) NOT NULL, "slug" character varying(100) NOT NULL, "taskId" integer NOT NULL, CONSTRAINT "UQ_cb713fbc210a1cd62ac5229d428" UNIQUE ("slug"), CONSTRAINT "PK_fdfe81d56fdd20fcc64770b5985" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "jobberId" integer NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task_to_material" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "rawMaterialId" integer NOT NULL, "taskId" integer NOT NULL, "quantityUsed" integer NOT NULL, CONSTRAINT "PK_d3340a72642c899c98bb296891c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_record" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "quantity" numeric(10,2) NOT NULL, "unitWeight" numeric(10,2) NOT NULL, "unitPrice" numeric(10,2) NOT NULL, "totalPrice" numeric(10,2) NOT NULL, "supplier" character varying(255), "invoiceNumber" character varying(255), "notes" text, "rawMaterialId" integer NOT NULL, CONSTRAINT "PK_eb964739ba310c11e90dd442afd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "raw_material" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "name" character varying(255) NOT NULL, "packetsAvailable" integer NOT NULL, "size" character varying(255) NOT NULL, "categories" text array NOT NULL, "weightPerUnit" integer NOT NULL, "totalWeight" integer NOT NULL, "slug" character varying(255) NOT NULL, "color" character varying(255), "parentCategoryId" integer, CONSTRAINT "UQ_313190bd0e7e6f7235588297cd5" UNIQUE ("name", "size"), CONSTRAINT "PK_78620c6a699438f30545519c86b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ready_product" ADD CONSTRAINT "FK_e66a7735f42932dc94c73320518" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "purchase_record" ADD CONSTRAINT "FK_369aecdd422622891fcf8086acc" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "purchase_record" DROP CONSTRAINT "FK_369aecdd422622891fcf8086acc"`,
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
    await queryRunner.query(
      `ALTER TABLE "ready_product" DROP CONSTRAINT "FK_e66a7735f42932dc94c73320518"`,
    );
    await queryRunner.query(`DROP TABLE "raw_material"`);
    await queryRunner.query(`DROP TABLE "purchase_record"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "task_to_material"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "ready_product"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
