import { TCreateSegmentInput, TSegmentModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityAlreadyExistsError, EntityNotFoundError } from '@src/errors';
import { SegmentRepositoryInterface, StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { ICreateSegmentUseCase } from './create.interface';

@provideSingleton(CreateSegmentUseCase)
export class CreateSegmentUseCase implements ICreateSegmentUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(input: TCreateSegmentInput): Promise<TSegmentModel> {
    const [story, alreadyHasFirstSegment] = await Promise.all([
      this.storyRepository.selectOne({ id: input.idStory }),
      this.segmentRepository.selectOne({ idStory: input.idStory, isFirst: true }),
    ]);

    if (!story) throw new EntityNotFoundError(Entities.STORY);

    if (alreadyHasFirstSegment)
      throw new EntityAlreadyExistsError(
        `${Entities.STORY} already has a first segment. You can create it as a non first segment and update it later`,
      );

    const segment = await this.segmentRepository.create(input);

    return segment;
  }
}
