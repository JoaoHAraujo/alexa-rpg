import { TTagModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { TagEntity } from '@src/infra/db/entities';
import { StoryRepositoryInterface, TagRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { TPaginationParams } from '@src/utils/pagination';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { ILike } from 'typeorm';

import { TPagination } from '../../../../utils/interfaces/pagination';
import { ISelectTagPaginationUseCase, TTagSearchParams } from './select-paginaton.interface';

@provideSingleton(SelectTagPaginationUseCase)
export class SelectTagPaginationUseCase implements ISelectTagPaginationUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
    @inject(TYPES.repositories.TagRepository)
    private readonly tagRepository: TagRepositoryInterface,
  ) {}

  async execute(
    idStory: string,
    searchParams: TTagSearchParams,
    paginationParams: TPaginationParams<TagEntity>,
  ): Promise<TPagination<TTagModel>> {
    const storyExists = await this.storyRepository.selectOne({ id: idStory });

    if (!storyExists) throw new EntityNotFoundError(Entities.STORY);

    const response = await this.tagRepository.selectPagination(
      {
        idStory,
        ...(searchParams.name && { name: ILike(`%${searchParams.name}%`) }),
        ...(searchParams.type && { type: searchParams.type }),
      },
      paginationParams,
    );

    return response;
  }
}
