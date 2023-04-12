import { MigrationInterface, QueryRunner } from "typeorm";

export class addAppleRefreshToken1679558085821 implements MigrationInterface {
    name = 'addAppleRefreshToken1679558085821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" ADD "apple_refresh_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "apple_refresh_token"`);
    }

}
