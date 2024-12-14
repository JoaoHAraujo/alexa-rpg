import { TTagModel } from '@src/domain/models';
import { TagTypes } from '@src/enums';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import { StoryEntity } from './story.entity';

@Entity('tag')
export class TagEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  public name: string;

  @Column({ name: 'type', type: 'varchar', enum: TagTypes })
  public type: TagTypes;

  @Column({ name: 'idStory', type: 'uuid' })
  public idStory: string;

  @ManyToOne(() => StoryEntity, () => TagEntity)
  @JoinColumn({ name: 'id_story', referencedColumnName: 'id' })
  public story: StoryEntity;

  public toModel(): TTagModel {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      idStory: this.idStory,
      ...(this.story && { story: this.story.toModel() }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.deletedAt && { deletedAt: this.deletedAt }),
    };
  }
}
