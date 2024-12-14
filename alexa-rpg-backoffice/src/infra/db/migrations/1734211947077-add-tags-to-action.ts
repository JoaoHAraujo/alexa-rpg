import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTagsToAction1734211947077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'action',
      new TableColumn({
        name: 'tags',
        type: 'varchar',
        isNullable: false,
        isArray: true,
        default: 'ARRAY[]::varchar[]',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('action', 'tags');
  }
}
