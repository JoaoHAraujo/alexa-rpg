import { TActionModel } from '@src/domain/models';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import { SegmentEntity } from './segment.entity';
import { StoryEntity } from './story.entity';

@Entity('action')
export class ActionEntity extends BaseEntity {
  @Column({ name: 'id_story', type: 'uuid' })
  public idStory: string;

  @Column({ name: 'id_origin_segment', type: 'uuid' })
  public idOriginSegment: string;

  @Column({ name: 'id_segment_success', type: 'uuid' })
  public idSegmentSuccess: string;

  @Column({ name: 'id_segment_failure', type: 'uuid', nullable: true })
  public idSegmentFailure?: string;

  @Column({ name: 'success_rate', type: 'int4' })
  public successRate: number;

  @Column({ name: 'tags', array: true, type: 'varchar' })
  public tags: string[];

  @Column({ name: 'description', type: 'varchar' })
  public description: string;

  @ManyToOne(() => SegmentEntity, () => ActionEntity)
  @JoinColumn({ name: 'id_origin_segment', referencedColumnName: 'id' })
  public originSegment?: SegmentEntity;

  @ManyToOne(() => SegmentEntity, () => ActionEntity)
  @JoinColumn({ name: 'id_segment_success', referencedColumnName: 'id' })
  public segmentSuccess?: SegmentEntity;

  @ManyToOne(() => SegmentEntity, () => ActionEntity)
  @JoinColumn({ name: 'id_segment_failure', referencedColumnName: 'id' })
  public segmentFailure?: SegmentEntity;

  @ManyToOne(() => StoryEntity, () => ActionEntity)
  @JoinColumn({ name: 'id_story', referencedColumnName: 'id' })
  public story?: StoryEntity;

  public toModel(): TActionModel {
    return {
      id: this.id,
      idStory: this.idStory,
      idOriginSegment: this.idOriginSegment,
      idSegmentSuccess: this.idSegmentSuccess,
      idSegmentFailure: this.idSegmentFailure,
      successRate: this.successRate,
      description: this.description,
      tags: this.tags,
      ...(this.story && { story: this.story.toModel() }),
      ...(this.originSegment && { originSegment: this.originSegment.toModel() }),
      ...(this.segmentSuccess && { segmentSuccess: this.segmentSuccess.toModel() }),
      ...(this.segmentFailure && { segmentFailure: this.segmentFailure.toModel() }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.deletedAt && { deletedAt: this.deletedAt }),
    };
  }
}
