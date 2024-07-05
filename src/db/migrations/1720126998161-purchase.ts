import { MigrationInterface, QueryRunner } from 'typeorm';

export class Purchase1720126998161 implements MigrationInterface {
  name = 'Purchase1720126998161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "purchase_record" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "quantity" numeric(10,2) NOT NULL, "unitPrice" numeric(10,2) NOT NULL, "totalPrice" numeric(10,2) NOT NULL, "supplier" character varying(255), "invoiceNumber" character varying(255), "notes" text, "rawMaterialId" integer NOT NULL, CONSTRAINT "PK_eb964739ba310c11e90dd442afd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_record" ADD CONSTRAINT "FK_369aecdd422622891fcf8086acc" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchase_record" DROP CONSTRAINT "FK_369aecdd422622891fcf8086acc"`,
    );
    await queryRunner.query(`DROP TABLE "purchase_record"`);
  }
}
