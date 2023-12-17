import { StoryModel } from '@src/domain/models';
import { Column, Entity, OneToMany } from 'typeorm';

import BaseEntity from './base-entity';
import { SegmentEntity } from './segment.entity';

@Entity('story')
export class StoryEntity extends BaseEntity {
  @Column({ name: 'title' })
  public title: string;

  @Column({ name: 'is_active' })
  public isActive: boolean;

  @OneToMany(() => SegmentEntity, (segment) => segment.story)
  public segments: SegmentEntity[];

  public toModel(): StoryModel {
    return {
      id: this.id,
      title: this.title,
      isActive: this.isActive,
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.deletedAt && { deletedAt: this.deletedAt }),
    };
  }
}
