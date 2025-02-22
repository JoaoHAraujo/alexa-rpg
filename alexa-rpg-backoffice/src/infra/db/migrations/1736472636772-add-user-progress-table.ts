import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

import { baseColumns } from '../config/base-columns';

export class AddUserProgressTable1736472636772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_progress',
        columns: [
          {
            name: 'id_amazon',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'id_story',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_segment',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'finalized',
            type: 'boolean',
            isNullable: false,
            default: false,
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
          new TableForeignKey({
            name: 'FK_id_segment',
            referencedTableName: 'segment',
            referencedColumnNames: ['id'],
            columnNames: ['id_segment'],
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_progress');
  }
}
