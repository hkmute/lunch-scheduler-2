import { MigrationInterface, QueryRunner } from "typeorm";

export class addAllowGuestEditToCode1681558636558 implements MigrationInterface {
    name = 'addAllowGuestEditToCode1681558636558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code" ADD "allow_guest_edit" boolean DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code" DROP COLUMN "allow_guest_edit"`);
    }

}
