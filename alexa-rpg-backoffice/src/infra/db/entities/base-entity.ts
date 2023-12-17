import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export default class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  public createdAt?: Date | string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  public updatedAt?: Date | string;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  public deletedAt?: Date | string;
}
