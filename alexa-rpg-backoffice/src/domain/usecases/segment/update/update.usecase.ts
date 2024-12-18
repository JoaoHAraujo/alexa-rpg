import { TSegmentModel, TTagModel, TUpdateSegmentInput } from '@src/domain/models';
import { Entities, TagTypes } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { SegmentRepositoryInterface, TagRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { In } from 'typeorm';

import { IUpdateSegmentUseCase } from './update.interface';

@provideSingleton(UpdateSegmentUseCase)
export class UpdateSegmentUseCase implements IUpdateSegmentUseCase {
  constructor(
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
    @inject(TYPES.repositories.TagRepository)
    private readonly tagRepository: TagRepositoryInterface,
  ) {}

  async execute(idSegment: string, input: TUpdateSegmentInput): Promise<TSegmentModel> {
    const oldSegment = await this.segmentRepository.selectOne({ id: idSegment });

    if (!oldSegment) throw new EntityNotFoundError(Entities.SEGMENT);

    const tagNamesToCreate = await this.tagRepository.checkNonExistentTags(oldSegment.idStory, input.tags, 'segment');
    const tagsToCreate = tagNamesToCreate.map((name): Partial<TTagModel> => {
      return { name, idStory: oldSegment.idStory, type: TagTypes.SEGMENT };
    });

    const response = await this.segmentRepository.update(idSegment, input);

    const tagsToDepreciate = await this.tagRepository.checkNonExistentTags(
      oldSegment.idStory,
      oldSegment.tags,
      'segment',
    );

    await Promise.all([
      this.tagRepository.bulkDelete({ idStory: oldSegment.idStory, name: In(tagsToDepreciate) }),
      this.tagRepository.bulkCreate(tagsToCreate),
    ]);

    return response;
  }
}
