import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

import { baseColumns } from '../config/base-columns';

export class AddTagTable1734212061118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tag',
        columns: [
          {
            name: 'id_story',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
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
    await queryRunner.dropTable('tag', true);
  }
}
