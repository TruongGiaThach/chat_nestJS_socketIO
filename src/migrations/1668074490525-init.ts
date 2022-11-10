import { MigrationInterface, QueryRunner } from "typeorm";

export class init1668074490525 implements MigrationInterface {
    name = 'init1668074490525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "text" character varying NOT NULL, "createdat" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7f3e04a25760adbd8ac4a60cab8" UNIQUE ("text"), CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "chat"`);
    }

}
