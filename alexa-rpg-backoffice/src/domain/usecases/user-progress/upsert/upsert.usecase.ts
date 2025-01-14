import { TUserProgressModel } from '@src/domain/models';
import { Entities } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { SegmentRepositoryInterface, UserProgressRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { IUpsertUserProgressUseCase, TUpsertUserProgressInput } from './upsert.interface';

@provideSingleton(UpsertUserProgressUseCase)
export class UpsertUserProgressUseCase implements IUpsertUserProgressUseCase {
  constructor(
    @inject(TYPES.repositories.UserProgressRepository)
    private readonly userProgressRepository: UserProgressRepositoryInterface,
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(input: TUpsertUserProgressInput): Promise<TUserProgressModel> {
    const { idAmazon, idStory, idNewSegment } = input;

    const [userProgress, newSegmentExists] = await Promise.all([
      this.userProgressRepository.selectOne({ idAmazon, idStory, finalized: false }),
      this.segmentRepository.selectOne({ id: idNewSegment, idStory }),
    ]);

    if (!newSegmentExists) throw new EntityNotFoundError(Entities.SEGMENT);

    if (userProgress) {
      return this.userProgressRepository.update(userProgress.id, { idSegment: idNewSegment });
    }

    return this.userProgressRepository.create({ idAmazon, idStory, idSegment: idNewSegment });
  }
}
