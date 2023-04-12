import { MigrationInterface, QueryRunner } from "typeorm";

export class initDb1676560673206 implements MigrationInterface {
    name = 'initDb1676560673206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "history" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "date" TIMESTAMP NOT NULL, "code_id" integer, "option_id" integer, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "date" TIMESTAMP NOT NULL, "voter" character varying NOT NULL, "code_id" integer, "today_option_id" integer, CONSTRAINT "day_vote" UNIQUE ("date", "voter", "code_id"), CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "today_option" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "date" TIMESTAMP NOT NULL, "code_id" integer, "option_id" integer, CONSTRAINT "PK_6ac1c21463b089cc039be81725b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_user" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "username" character varying NOT NULL, "email" character varying, "display_name" character varying NOT NULL, CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "code" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "code" character varying NOT NULL, "owner_id" integer, "option_list_id" integer, CONSTRAINT "UQ_3aab60cbcf5684b4a89fb46147e" UNIQUE ("code"), CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3aab60cbcf5684b4a89fb46147" ON "code" ("code") `);
        await queryRunner.query(`CREATE TABLE "option_list" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "name" character varying NOT NULL, "owner_id" integer, CONSTRAINT "PK_40446ca8372e307c4db3a0ed0ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "option" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_5e47276c1d6a3fb881283fdbf14" UNIQUE ("name"), CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "option_in_list" ("option_list_id" integer NOT NULL, "option_id" integer NOT NULL, CONSTRAINT "PK_59c4f9ac9050930ea975946b4b8" PRIMARY KEY ("option_list_id", "option_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8406675b501bc131844be60092" ON "option_in_list" ("option_list_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1c6097b978193fc81496e3a30c" ON "option_in_list" ("option_id") `);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_56f113a210667689ee64fa2e7bf" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_ba6cc85109b82a7d295cc874aa1" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_5b86d343f168988469c70f2f385" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_04c8f8af9ce4e81a1506309b1c0" FOREIGN KEY ("today_option_id") REFERENCES "today_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "today_option" ADD CONSTRAINT "FK_a28569a11fb5315b95777800766" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "today_option" ADD CONSTRAINT "FK_bd1d6452204d58a6ab423dadbcd" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "code" ADD CONSTRAINT "FK_d771d67671d5db3cbc7bddeec1e" FOREIGN KEY ("owner_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "code" ADD CONSTRAINT "FK_84783feb0aa1a685c432bf37d4e" FOREIGN KEY ("option_list_id") REFERENCES "option_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "option_list" ADD CONSTRAINT "FK_260344122768120a3bb31112e99" FOREIGN KEY ("owner_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "option_in_list" ADD CONSTRAINT "FK_8406675b501bc131844be600922" FOREIGN KEY ("option_list_id") REFERENCES "option_list"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "option_in_list" ADD CONSTRAINT "FK_1c6097b978193fc81496e3a30c3" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option_in_list" DROP CONSTRAINT "FK_1c6097b978193fc81496e3a30c3"`);
        await queryRunner.query(`ALTER TABLE "option_in_list" DROP CONSTRAINT "FK_8406675b501bc131844be600922"`);
        await queryRunner.query(`ALTER TABLE "option_list" DROP CONSTRAINT "FK_260344122768120a3bb31112e99"`);
        await queryRunner.query(`ALTER TABLE "code" DROP CONSTRAINT "FK_84783feb0aa1a685c432bf37d4e"`);
        await queryRunner.query(`ALTER TABLE "code" DROP CONSTRAINT "FK_d771d67671d5db3cbc7bddeec1e"`);
        await queryRunner.query(`ALTER TABLE "today_option" DROP CONSTRAINT "FK_bd1d6452204d58a6ab423dadbcd"`);
        await queryRunner.query(`ALTER TABLE "today_option" DROP CONSTRAINT "FK_a28569a11fb5315b95777800766"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_04c8f8af9ce4e81a1506309b1c0"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_5b86d343f168988469c70f2f385"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_ba6cc85109b82a7d295cc874aa1"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_56f113a210667689ee64fa2e7bf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c6097b978193fc81496e3a30c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8406675b501bc131844be60092"`);
        await queryRunner.query(`DROP TABLE "option_in_list"`);
        await queryRunner.query(`DROP TABLE "option"`);
        await queryRunner.query(`DROP TABLE "option_list"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3aab60cbcf5684b4a89fb46147"`);
        await queryRunner.query(`DROP TABLE "code"`);
        await queryRunner.query(`DROP TABLE "app_user"`);
        await queryRunner.query(`DROP TABLE "today_option"`);
        await queryRunner.query(`DROP TABLE "vote"`);
        await queryRunner.query(`DROP TABLE "history"`);
    }

}
