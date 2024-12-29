import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAgeClasseToStory1735495729247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'story',
      new TableColumn({
        name: 'age_class',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('story', 'age_class');
  }
}
