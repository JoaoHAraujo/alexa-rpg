import { TActionModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { ActionRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IGetActionByIdUseCase } from './get-by-id.interface';

@provideSingleton(GetActionByIdUseCase)
export class GetActionByIdUseCase implements IGetActionByIdUseCase {
  constructor(
    @inject(TYPES.repositories.ActionRepository)
    private readonly actionRepository: ActionRepositoryInterface,
  ) {}

  async execute(idAction: string): Promise<TActionModel | null> {
    const action = await this.actionRepository.selectOne({ id: idAction });

    if (!action) throw new EntityNotFoundError(Entities.ACTION);

    return action;
  }
}
