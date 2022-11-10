import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1668065740999 implements MigrationInterface {
    name = 'Init1668065740999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "text" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "UQ_7f3e04a25760adbd8ac4a60cab8" UNIQUE ("text")`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "createdat" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "createdat" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "createdat" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "createdat" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "UQ_7f3e04a25760adbd8ac4a60cab8"`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "text" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "PK_9d0b2ba74336710fd31154738a5"`);
    }

}
