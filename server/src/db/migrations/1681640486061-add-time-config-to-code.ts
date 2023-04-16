import { MigrationInterface, QueryRunner } from "typeorm";

export class addTimeConfigToCode1681640486061 implements MigrationInterface {
    name = 'addTimeConfigToCode1681640486061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code" ADD "vote_hour" integer DEFAULT '8'`);
        await queryRunner.query(`ALTER TABLE "code" ADD "lottery_hour" integer DEFAULT '11'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code" DROP COLUMN "lottery_hour"`);
        await queryRunner.query(`ALTER TABLE "code" DROP COLUMN "vote_hour"`);
    }

}
