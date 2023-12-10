import { TableColumnOptions } from 'typeorm';

export const baseColumns: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'uuid',
    isPrimary: true,
    generationStrategy: 'uuid',
    default: 'uuid_generate_v4()',
  },
  {
    name: 'created_at',
    type: 'timestamptz',
    default: 'now()',
  },
  {
    name: 'updated_at',
    type: 'timestamptz',
    default: 'now()',
  },
  {
    name: 'deleted_at',
    type: 'timestamptz',
    isNullable: true,
  },
];
