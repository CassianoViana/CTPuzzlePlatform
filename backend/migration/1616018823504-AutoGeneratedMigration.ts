import {MigrationInterface, QueryRunner} from "typeorm";

export class AutoGeneratedMigration1616018823504 implements MigrationInterface {
    name = 'AutoGeneratedMigration1616018823504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_7ed4fdad17bd1fe0f840388ccda"`);
        await queryRunner.query(`ALTER TABLE "test" ALTER COLUMN "researchGroupId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "test"."researchGroupId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_7ed4fdad17bd1fe0f840388ccda" FOREIGN KEY ("researchGroupId") REFERENCES "research_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_7ed4fdad17bd1fe0f840388ccda"`);
        await queryRunner.query(`COMMENT ON COLUMN "test"."researchGroupId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "test" ALTER COLUMN "researchGroupId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_7ed4fdad17bd1fe0f840388ccda" FOREIGN KEY ("researchGroupId") REFERENCES "research_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "confirmationCode" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."confirmationCode" IS NULL`);
    }

}
