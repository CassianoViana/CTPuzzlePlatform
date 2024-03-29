import {MigrationInterface, QueryRunner} from "typeorm";

export class AutoGeneratedMigration1624822474613 implements MigrationInterface {
    name = 'AutoGeneratedMigration1624822474613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" ALTER COLUMN "score" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "score"."score" IS NULL`);
        await queryRunner.query(`ALTER TABLE "score" ALTER COLUMN "max" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "score"."max" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "score"."max" IS NULL`);
        await queryRunner.query(`ALTER TABLE "score" ALTER COLUMN "max" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "score"."score" IS NULL`);
        await queryRunner.query(`ALTER TABLE "score" ALTER COLUMN "score" TYPE numeric`);
    }

}
