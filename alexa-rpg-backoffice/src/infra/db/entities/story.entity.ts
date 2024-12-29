import { TStoryModel } from '@src/domain/models';
import { Column, Entity, OneToMany } from 'typeorm';

import { ActionEntity } from './action.entity';
import BaseEntity from './base-entity';
import { SegmentEntity } from './segment.entity';
import { TagEntity } from './tag.entity';

@Entity('story')
export class StoryEntity extends BaseEntity {
  @Column({ name: 'title' })
  public title: string;

  @Column({ name: 'is_active' })
  public isActive: boolean;

  @Column({ name: 'age_class' })
  public ageClass: number;

  @OneToMany(() => SegmentEntity, (segment) => segment.story)
  public segments?: SegmentEntity[];

  @OneToMany(() => ActionEntity, (action) => action.story)
  public actions?: ActionEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.story)
  public tags?: TagEntity[];

  public toModel(): TStoryModel {
    return {
      id: this.id,
      title: this.title,
      isActive: this.isActive,
      ageClass: this.ageClass,
      ...(this.actions?.length && { actions: this.actions.map((i) => i.toModel()) }),
      ...(this.segments?.length && { segments: this.segments.map((i) => i.toModel()) }),
      ...(this.tags?.length && { tags: this.tags.map((i) => i.toModel()) }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.deletedAt && { deletedAt: this.deletedAt }),
    };
  }
}
