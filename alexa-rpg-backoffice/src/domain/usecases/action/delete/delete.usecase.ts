import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { ActionRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IDeleteActionUseCase } from './delete.interface';

@provideSingleton(DeleteActionUseCase)
export class DeleteActionUseCase implements IDeleteActionUseCase {
  constructor(
    @inject(TYPES.repositories.ActionRepository) private readonly actionRepository: ActionRepositoryInterface,
  ) {}

  async execute(idAction: string): Promise<boolean> {
    const action = await this.actionRepository.selectOne({ id: idAction });

    if (!action) throw new EntityNotFoundError(Entities.ACTION);

    await this.actionRepository.delete({ id: idAction });

    return true;
  }
}
