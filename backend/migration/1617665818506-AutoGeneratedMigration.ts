import {MigrationInterface, QueryRunner} from "typeorm";

export class AutoGeneratedMigration1617665818506 implements MigrationInterface {
    name = 'AutoGeneratedMigration1617665818506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "participation"."observations" IS NULL`);
        await queryRunner.query(`ALTER TABLE "participation" ALTER COLUMN "observations" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participation" ALTER COLUMN "observations" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "participation"."observations" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
    }

}
