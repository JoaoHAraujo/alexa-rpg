import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

import { baseColumns } from '../config/base-columns';

export class AddSegmentTable1732844817722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'segment',
        columns: [
          {
            name: 'id_story',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'narrative',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'is_first',
            type: 'boolean',
            isNullable: false,
          },
          ...baseColumns,
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FK_id_story',
            referencedTableName: 'story',
            referencedColumnNames: ['id'],
            columnNames: ['id_story'],
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('segment', true);
  }
}
