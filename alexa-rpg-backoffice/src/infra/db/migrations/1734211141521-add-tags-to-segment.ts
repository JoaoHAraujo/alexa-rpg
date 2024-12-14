/* eslint-disable @typescript-eslint/quotes */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTagsToSegment1734211141521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'segment',
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
    await queryRunner.dropColumn('segment', 'tags');
  }
}
