import {MigrationInterface, QueryRunner} from "typeorm";

export class AutoGeneratedMigration1617546417856 implements MigrationInterface {
    name = 'AutoGeneratedMigration1617546417856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "test_application" ADD "visibility" character varying NOT NULL DEFAULT 'PRIVATE'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
        await queryRunner.query(`ALTER TABLE "test_application" DROP COLUMN "visibility"`);
        await queryRunner.query(`ALTER TABLE "test" ADD "type" character varying`);
    }

}
