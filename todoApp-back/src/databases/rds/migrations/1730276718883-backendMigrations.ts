import { MigrationInterface, QueryRunner } from "typeorm";

export class BackendMigrations1730276718883 implements MigrationInterface {
    name = 'BackendMigrations1730276718883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "userName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userName" TO "name"`);
    }

}
