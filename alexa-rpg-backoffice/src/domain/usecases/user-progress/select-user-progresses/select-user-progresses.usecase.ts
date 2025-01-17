import { TUserProgressModel } from '@src/domain/models';
import { UserProgressRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { LessThanOrEqual } from 'typeorm';

import { ISelectUserProgressesUseCase } from './select-user-progresses.interface';

@provideSingleton(SelectUserProgressesUseCase)
export class SelectUserProgressesUseCase implements ISelectUserProgressesUseCase {
  constructor(
    @inject(TYPES.repositories.UserProgressRepository)
    private readonly userProgressRepository: UserProgressRepositoryInterface,
  ) {}

  async execute(idAmazon: string, age: number): Promise<TUserProgressModel[]> {
    const allProgresses = await this.userProgressRepository.selectMany(
      {
        idAmazon,
        finalized: false,
        ...(typeof age === 'number' && { story: { ageClass: LessThanOrEqual(age), isActive: true } }),
      },
      { relations: ['story'] },
    );

    return allProgresses;
  }
}
