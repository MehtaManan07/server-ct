import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchaseTotal1720127493203 implements MigrationInterface {
    name = 'PurchaseTotal1720127493203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_record" ADD "unitWeight" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_record" DROP COLUMN "unitWeight"`);
    }

}
