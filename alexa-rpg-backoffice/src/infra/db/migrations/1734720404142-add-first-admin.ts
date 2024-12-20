/* eslint-disable @typescript-eslint/quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFirstAdmin1734720404142 implements MigrationInterface {
  private starterEmail = 'root@admin.com';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { count } = (await queryRunner.query('SELECT COUNT(*) FROM admin WHERE deleted_at IS NULL'))[0] as {
      count: number;
    };

    if (Number(count)) return;

    await queryRunner.query(
      `INSERT INTO admin (name, email, password, created_at, updated_at) VALUES ('Root Admin', '${this.starterEmail}', '46cae6cb0468647f687e9f1b4c266f576b02da40d5c297de084f8a66e139e31c', NOW(), NOW())`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM admin WHERE email = '${this.starterEmail}'`);
  }
}
