import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseEntity1716128954926 implements MigrationInterface {
    name = 'BaseEntity1716128954926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "task_to_material" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "task_to_material" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task_to_material" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP CONSTRAINT "UQ_a280e6bf273bfae9a726ca9703a"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "name" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD CONSTRAINT "UQ_a280e6bf273bfae9a726ca9703a" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "task_to_material" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "task_to_material" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "task_to_material" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "description" character varying NOT NULL`);
    }

}
