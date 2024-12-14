import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

import { baseColumns } from '../config/base-columns';

export class AddActionTable1734141118466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'action',
        columns: [
          {
            name: 'id_story',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_origin_segment',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_segment_success',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_segment_failure',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'success_rate',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          ...baseColumns,
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FK_id_origin_segment',
            referencedTableName: 'segment',
            referencedColumnNames: ['id'],
            columnNames: ['id_origin_segment'],
          }),
          new TableForeignKey({
            name: 'FK_id_segment_success',
            referencedTableName: 'segment',
            referencedColumnNames: ['id'],
            columnNames: ['id_segment_success'],
          }),
          new TableForeignKey({
            name: 'FK_id_segment_failure',
            referencedTableName: 'segment',
            referencedColumnNames: ['id'],
            columnNames: ['id_segment_failure'],
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('action');
  }
}
