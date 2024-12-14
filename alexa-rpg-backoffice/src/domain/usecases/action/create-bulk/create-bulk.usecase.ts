import { getEnv } from '@src/constants';
import { TActionModel, TCreateActionInput } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError, InvalidParamError } from '@src/errors';
import { SegmentRepositoryInterface } from '@src/infra/db/repositories';
import { ActionRepositoryInterface } from '@src/infra/db/repositories/action';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { In } from 'typeorm';

import { ICreateBulkActionUseCase } from './create-bulk.interface';

@provideSingleton(CreateBulkActionUseCase)
export class CreateBulkActionUseCase implements ICreateBulkActionUseCase {
  constructor(
    @inject(TYPES.repositories.ActionRepository)
    private readonly actionRepository: ActionRepositoryInterface,
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(data: TCreateActionInput): Promise<TActionModel[]> {
    if (!data.actions.length) throw new InvalidParamError('Missing actions data');

    if (data.actions.length > getEnv().actionLimit) {
      throw new InvalidParamError(
        `Total actions over limit. Total actions accepted per segment: ${getEnv().actionLimit}`,
      );
    }

    const segmentsIds: string[] = [];
    data.actions.forEach((action) =>
      segmentsIds.push(action.idSegmentSuccess, ...(action.idSegmentFailure ? [action.idSegmentFailure] : [])),
    );

    const uniqueSegmentIds = Array.from(new Set(segmentsIds));

    const [originSegmentExists, segmentsRelations, actionsCount] = await Promise.all([
      this.segmentRepository.selectOne({ id: data.idOriginSegment }),
      this.segmentRepository.selectMany({ id: In(uniqueSegmentIds) }),
      this.actionRepository.count({ idOriginSegment: data.idOriginSegment }),
    ]);

    if (!originSegmentExists) throw new EntityNotFoundError(`${Entities} origin`);

    if (actionsCount + data.actions.length > getEnv().actionLimit) {
      throw new InvalidParamError(
        `Request exceeds the limit: current count (${actionsCount}) + requested quantity (${
          data.actions.length
        }) exceeds the allowed limit of ${getEnv().actionLimit}. Please reduce the quantity and try again.`,
      );
    }

    if (segmentsRelations.length !== uniqueSegmentIds.length) {
      const foundSegmentsIds = segmentsRelations.map((segment) => segment.id);

      const idsNotFound = uniqueSegmentIds.filter((uniqueId) => !foundSegmentsIds.includes(uniqueId));

      throw new InvalidParamError(`Some segment relations were not found: ${idsNotFound}`);
    }

    const actionsSaved = await this.actionRepository.bulkCreate(
      data.actions.map((action) => {
        return {
          ...action,
          idOriginSegment: data.idOriginSegment,
        };
      }),
    );

    return actionsSaved;
  }
}
