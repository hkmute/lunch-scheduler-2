import { MigrationInterface, QueryRunner } from "typeorm";

export class removeVoteUnique1682650190669 implements MigrationInterface {
    name = 'removeVoteUnique1682650190669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "day_vote"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "day_vote" UNIQUE ("date", "voter", "code_id")`);
    }

}
