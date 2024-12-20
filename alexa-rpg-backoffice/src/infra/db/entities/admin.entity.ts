import { TAdminModel } from '@src/domain/models';
import { Column, Entity } from 'typeorm';

import BaseEntity from './base-entity';

@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  public name: string;

  @Column({ name: 'email', type: 'varchar' })
  public email: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  public password: string;

  public toModel(): TAdminModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.deletedAt && { deletedAt: this.deletedAt }),
    };
  }
}
