import { MigrationInterface, QueryRunner } from "typeorm";

export class addVoteUniqueSet1682650283922 implements MigrationInterface {
    name = 'addVoteUniqueSet1682650283922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "day_vote" UNIQUE ("date", "voter", "code_id", "type")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "day_vote"`);
    }

}
