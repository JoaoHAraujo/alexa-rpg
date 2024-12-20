import { TActionModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { ActionEntity } from '@src/infra/db/entities';
import { ActionRepositoryInterface, StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TPagination } from '@src/utils/interfaces/pagination';
import { TYPES } from '@src/utils/inversify-types';
import { TPaginationParams } from '@src/utils/pagination';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { ArrayContains, FindOptionsWhere, ILike, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm';

import { ISelectActionPaginationUseCase, TActionParams } from './select-pagination.interface';

@provideSingleton(SelectActionPaginationUseCase)
export class SelectActionPaginationUseCase implements ISelectActionPaginationUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
    @inject(TYPES.repositories.ActionRepository)
    private readonly actionRepository: ActionRepositoryInterface,
  ) {}

  async execute(
    idStory: string,
    searchParams: TActionParams,
    paginationParams: TPaginationParams<ActionEntity>,
  ): Promise<TPagination<TActionModel>> {
    const storyExists = await this.storyRepository.selectOne({ id: idStory });

    if (!storyExists) throw new EntityNotFoundError(Entities.STORY);

    const response = await this.actionRepository.selectPagination(
      {
        idStory,
        ...(searchParams.description && { description: ILike(`%${searchParams.description}%`) }),
        ...(searchParams.tags?.length && { tags: ArrayContains(searchParams.tags) }),
        ...(typeof searchParams.successRate === 'number' &&
          this.defineSuccessRateParam(searchParams.successRate, searchParams.successRateComparator)),
      },
      paginationParams,
    );

    return response;
  }

  private defineSuccessRateParam(
    successRate: number,
    successRateComparator?: TActionParams['successRateComparator'],
  ): Pick<FindOptionsWhere<ActionEntity>, 'successRate'> {
    let param: Pick<FindOptionsWhere<ActionEntity>, 'successRate'>;

    switch (successRateComparator) {
      case 'lt':
        param = { successRate: LessThan(successRate) };
        break;

      case 'lte':
        param = { successRate: LessThanOrEqual(successRate) };
        break;

      case 'bt':
        param = { successRate: MoreThan(successRate) };
        break;

      case 'bte':
        param = { successRate: MoreThanOrEqual(successRate) };
        break;

      default:
        param = { successRate };

        break;
    }

    return param;
  }
}
