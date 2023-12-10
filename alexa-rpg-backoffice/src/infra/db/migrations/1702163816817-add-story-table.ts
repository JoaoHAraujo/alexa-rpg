import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { baseColumns } from '../config/base-columns';

export class AddStoryTable1702163816817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'story',
        columns: [
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          ...baseColumns,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('story');
  }
}
