import { TStoryModel } from '@src/domain/models';
import { Column, Entity, OneToMany } from 'typeorm';

import { ActionEntity } from './action.entity';
import BaseEntity from './base-entity';
import { SegmentEntity } from './segment.entity';

@Entity('story')
export class StoryEntity extends BaseEntity {
  @Column({ name: 'title' })
  public title: string;

  @Column({ name: 'is_active' })
  public isActive: boolean;

  @OneToMany(() => SegmentEntity, (segment) => segment.story)
  public segments?: SegmentEntity[];

  @OneToMany(() => ActionEntity, (action) => action.story)
  public actions?: ActionEntity[];

  public toModel(): TStoryModel {
    return {
      id: this.id,
      title: this.title,
      isActive: this.isActive,
      ...(this.actions?.length && { actions: this.actions.map((i) => i.toModel()) }),
      ...(this.segments?.length && { segments: this.segments.map((i) => i.toModel()) }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.deletedAt && { deletedAt: this.deletedAt }),
    };
  }
}
