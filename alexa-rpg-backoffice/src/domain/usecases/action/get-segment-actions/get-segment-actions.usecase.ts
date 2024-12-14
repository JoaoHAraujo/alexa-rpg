import { TActionModel } from '@src/domain/models';
import { ActionRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IGetSegmentActionsUseCase } from './get-segment-actions.interface';

@provideSingleton(GetSegmentActionsUseCase)
export class GetSegmentActionsUseCase implements IGetSegmentActionsUseCase {
  constructor(
    @inject(TYPES.repositories.ActionRepository)
    private readonly actionRepository: ActionRepositoryInterface,
  ) {}

  async execute(idSegment: string): Promise<TActionModel[]> {
    const actions = await this.actionRepository.selectMany({ idOriginSegment: idSegment });

    return actions;
  }
}
