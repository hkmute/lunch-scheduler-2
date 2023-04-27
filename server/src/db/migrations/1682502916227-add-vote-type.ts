import { MigrationInterface, QueryRunner } from "typeorm";

export class addVoteType1682502916227 implements MigrationInterface {
    name = 'addVoteType1682502916227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."vote_type_enum" AS ENUM('up', 'down')`);
        await queryRunner.query(`ALTER TABLE "vote" ADD "type" "public"."vote_type_enum" NOT NULL DEFAULT 'up'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."vote_type_enum"`);
    }

}
