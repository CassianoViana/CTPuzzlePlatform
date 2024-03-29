import {MigrationInterface, QueryRunner} from "typeorm";

export class AutoGeneratedMigration1617573388140 implements MigrationInterface {
    name = 'AutoGeneratedMigration1617573388140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "test_application" DROP COLUMN "visibility"`);
        await queryRunner.query(`ALTER TABLE "test_application" ADD "visibility" character varying NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_application" DROP COLUMN "visibility"`);
        await queryRunner.query(`ALTER TABLE "test_application" ADD "visibility" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
    }

}
