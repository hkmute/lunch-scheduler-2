import { MigrationInterface, QueryRunner } from "typeorm";

export class addPushToken1682239312197 implements MigrationInterface {
    name = 'addPushToken1682239312197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "push_token" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "expo_token" character varying NOT NULL, "user_id" integer, "code_id" integer, CONSTRAINT "PK_cdd834aa4f6dc2efd7df5041233" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "push_token" ADD CONSTRAINT "FK_d877a5d2f20730f3a3c3b505e7d" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "push_token" ADD CONSTRAINT "FK_6dfcc37f91c21292d55c5675a10" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "push_token" DROP CONSTRAINT "FK_6dfcc37f91c21292d55c5675a10"`);
        await queryRunner.query(`ALTER TABLE "push_token" DROP CONSTRAINT "FK_d877a5d2f20730f3a3c3b505e7d"`);
        await queryRunner.query(`DROP TABLE "push_token"`);
    }

}
