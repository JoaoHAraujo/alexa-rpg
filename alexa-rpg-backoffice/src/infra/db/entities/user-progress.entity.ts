import { TUserProgressModel } from '@src/domain/models';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import { SegmentEntity } from './segment.entity';
import { StoryEntity } from './story.entity';

@Entity('user_progress')
export class UserProgressEntity extends BaseEntity {
  @Column({ name: 'id_amazon', type: 'varchar' })
  public idAmazon: string;

  @Column({ name: 'id_story', type: 'uuid' })
  public idStory: string;

  @Column({ name: 'id_segment', type: 'uuid' })
  public idSegment: string;

  @Column({ name: 'finalized', type: 'boolean' })
  public finalized: boolean;

  @ManyToOne(() => StoryEntity, () => UserProgressEntity)
  @JoinColumn({ name: 'id_story', referencedColumnName: 'id' })
  public story?: StoryEntity;

  @ManyToOne(() => SegmentEntity, () => UserProgressEntity)
  @JoinColumn({ name: 'id_segment', referencedColumnName: 'id' })
  public segment?: SegmentEntity;

  public toModel(): TUserProgressModel {
    return {
      id: this.id,
      idAmazon: this.idAmazon,
      idStory: this.idStory,
      idSegment: this.idSegment,
      finalized: this.finalized,
      ...(this.story && { story: this.story.toModel() }),
      ...(this.segment && { segment: this.segment.toModel() }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.deletedAt && { deletedAt: this.deletedAt }),
    };
  }
}
