import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { UserProgressRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IFinalizeUserProgressUseCase } from './finalize.interface';

@provideSingleton(FinalizeUserProgressUseCase)
export class FinalizeUserProgressUseCase implements IFinalizeUserProgressUseCase {
  constructor(
    @inject(TYPES.repositories.UserProgressRepository)
    private readonly userProgressRepository: UserProgressRepositoryInterface,
  ) {}

  async execute(idProgress: string, idAmazon: string): Promise<void> {
    const userProgress = await this.userProgressRepository.selectOne({ id: idProgress, idAmazon });

    if (!userProgress) throw new EntityNotFoundError(Entities.USER_PROGRESS);

    await this.userProgressRepository.update(idProgress, { finalized: true });
  }
}
