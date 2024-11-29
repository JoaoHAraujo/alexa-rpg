import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { SegmentRepositoryInterface, StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IGetStoryByIdUseCase, TGetStoryByIdResponse } from './get-by-id.interface';

@provideSingleton(GetStoryByIdUseCase)
export class GetStoryByIdUseCase implements IGetStoryByIdUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async getById(idStory: string): Promise<TGetStoryByIdResponse> {
    const [storyExists, firstSegment] = await Promise.all([
      this.storyRepository.selectOne({ id: idStory, isActive: true }),
      await this.segmentRepository.selectOne({ idStory, isFirst: true }),
    ]);

    if (!storyExists) throw new EntityNotFoundError(Entities.STORY);

    if (!firstSegment) throw new EntityNotFoundError(`First ${Entities.SEGMENT}`);

    return { ...storyExists, firstSegment };
  }
}
