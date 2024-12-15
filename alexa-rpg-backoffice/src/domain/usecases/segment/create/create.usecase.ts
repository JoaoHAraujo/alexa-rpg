import { TCreateSegmentInput, TSegmentModel } from '@src/domain/models';
import { Entities, TagTypes } from '@src/enums';
import { EntityNotFoundError } from '@src/errors';
import { SegmentRepositoryInterface, StoryRepositoryInterface } from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';

import { ICreateResultingTagUseCase } from '../../tag';
import { ICreateSegmentUseCase } from './create.interface';

@provideSingleton(CreateSegmentUseCase)
export class CreateSegmentUseCase implements ICreateSegmentUseCase {
  constructor(
    @inject(TYPES.repositories.StoryRepository)
    private readonly storyRepository: StoryRepositoryInterface,
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
    @inject(TYPES.usecases.CreateResultingTagUseCase)
    private createResultingTagUseCase: ICreateResultingTagUseCase,
  ) {}

  async execute(input: TCreateSegmentInput): Promise<TSegmentModel> {
    const [story, alreadyHasFirstSegment] = await Promise.all([
      this.storyRepository.selectOne({ id: input.idStory }),
      this.segmentRepository.selectOne({ idStory: input.idStory, isFirst: true }),
    ]);

    if (!story) throw new EntityNotFoundError(Entities.STORY);

    const isFirst = !alreadyHasFirstSegment?.isFirst;

    const [segment] = await Promise.all([
      this.segmentRepository.create({ ...input, isFirst }),
      this.createResultingTagUseCase.execute(input.idStory, input.tags, TagTypes.SEGMENT),
    ]);

    return segment;
  }
}
