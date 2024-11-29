import { TSegmentModel } from '@src/domain/models';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import { StoryEntity } from './story.entity';

@Entity('segment')
export class SegmentEntity extends BaseEntity {
  @Column({ name: 'narrative' })
  public narrative: string;

  @Column({ name: 'is_first', default: false })
  public isFirst: boolean;

  @Column({ name: 'id_story' })
  public idStory: string;

  @ManyToOne(() => StoryEntity, () => SegmentEntity)
  @JoinColumn({ name: 'id_story', referencedColumnName: 'id' })
  public story?: StoryEntity;

  public toModel(): TSegmentModel {
    return {
      id: this.id,
      narrative: this.narrative,
      isFirst: this.isFirst,
      idStory: this.idStory,
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.deletedAt && { deletedAt: this.deletedAt }),
    };
  }
}
