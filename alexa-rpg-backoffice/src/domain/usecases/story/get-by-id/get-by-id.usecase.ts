import { TStoryModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IGetStoryByIdUseCase } from './get-by-id.interface';

@provideSingleton(GetStoryByIdUseCase)
export class GetStoryByIdUseCase implements IGetStoryByIdUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
  ) {}

  async getById(idStory: string): Promise<TStoryModel> {
    const storyExists = await this.storyRepository.selectOne({ id: idStory, isActive: true });

    if (!storyExists) throw new EntityNotFoundError(Entities.STORY);

    return storyExists;
  }
}
