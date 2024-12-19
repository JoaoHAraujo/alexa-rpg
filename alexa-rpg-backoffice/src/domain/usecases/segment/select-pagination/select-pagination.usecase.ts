import { TSegmentModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { SegmentEntity } from '@src/infra/db/entities';
import { SegmentRepositoryInterface, StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TYPES } from '@src/utils/inversify-types';
import { TPaginationParams } from '@src/utils/pagination';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { ArrayContains, ILike } from 'typeorm';

import { ISelectSegmentPaginationUseCase, TSegmentSearchParams } from './select-pagination.interface';

@provideSingleton(SelectSegmentPaginationUseCase)
export class SelectSegmentPaginationUseCase implements ISelectSegmentPaginationUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(
    idStory: string,
    searchParams: TSegmentSearchParams,
    paginationParams: TPaginationParams<SegmentEntity>,
  ): Promise<TPagination<TSegmentModel>> {
    const storyExists = await this.storyRepository.selectOne({ id: idStory });

    if (!storyExists) throw new EntityNotFoundError(Entities.STORY);

    const response = await this.segmentRepository.selectPagination(
      {
        idStory,
        ...(typeof searchParams.isFirst === 'boolean' && { isFirst: searchParams.isFirst }),
        ...(searchParams.narrative && { narrative: ILike(`%${searchParams.narrative}%`) }),
        ...(searchParams.tags?.length && { tags: ArrayContains(searchParams.tags) }),
      },
      paginationParams,
    );

    return response;
  }
}
