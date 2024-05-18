import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAtTastToMaterial1716035785341 implements MigrationInterface {
    name = 'CreateAtTastToMaterial1716035785341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_material" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_material" DROP COLUMN "updatedDate"`);
    }

}
