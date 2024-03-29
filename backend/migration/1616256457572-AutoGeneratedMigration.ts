import {MigrationInterface, QueryRunner} from "typeorm";

export class AutoGeneratedMigration1616256457572 implements MigrationInterface {
    name = 'AutoGeneratedMigration1616256457572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_response" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
        await queryRunner.query(`ALTER TABLE "item_response" DROP COLUMN "deletedAt"`);
    }

}
