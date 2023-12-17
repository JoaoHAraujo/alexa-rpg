import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import { StoryEntity } from './story.entity';

@Entity('segment')
export class SegmentEntity extends BaseEntity {
  @Column({ name: 'text' })
  public text: string;

  @Column({ name: 'is_first', default: false })
  public isFirst: boolean;

  @Column({ name: 'id_story' })
  public idStory?: string;

  @ManyToOne(() => StoryEntity, () => SegmentEntity)
  @JoinColumn({ name: 'id_story', referencedColumnName: 'id' })
  public story?: StoryEntity;
}
