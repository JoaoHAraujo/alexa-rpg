import { TActionModel, TSegmentModel } from '@src/domain/models';
import { TagTypes } from '@src/enums';
import { InvalidParamError } from '@src/errors';
import {
  ActionRepositoryInterface,
  SegmentRepositoryInterface,
  TagRepositoryInterface,
} from '@src/infra/db/repositories';
import { TYPES } from '@src/utils/inversify-types';
import { provideSingleton } from '@src/utils/provide-singleton';
import { inject } from 'inversify';
import { ArrayOverlap, In } from 'typeorm';

import { IDeleteDepreciatedTagUseCase } from './delete-depreciated.interface';

type TEntryToFilter = TSegmentModel | TActionModel;

@provideSingleton(DeleteDepreciatedTagUseCase)
export class DeleteDepreciatedTagUseCase implements IDeleteDepreciatedTagUseCase {
  constructor(
    @inject(TYPES.repositories.TagRepository)
    private tagRepository: TagRepositoryInterface,
    @inject(TYPES.repositories.ActionRepository)
    private actionRepository: ActionRepositoryInterface,
    @inject(TYPES.repositories.SegmentRepository)
    private readonly segmentRepository: SegmentRepositoryInterface,
  ) {}

  async execute(idStory: string, tagsToCheck: string[], type: TagTypes): Promise<void> {
    let matchingEntries: TSegmentModel[] | TActionModel[] = [];

    switch (type) {
      case TagTypes.SEGMENT:
        matchingEntries = await this.segmentRepository.selectMany({
          idStory,
          tags: ArrayOverlap(tagsToCheck),
        });
        break;

      case TagTypes.ACTION:
        matchingEntries = await this.actionRepository.selectMany({
          idStory,
          tags: ArrayOverlap(tagsToCheck),
        });

      default:
        throw new InvalidParamError(`TagType not implemented: ${type}`);
    }

    const tagsToDelete = this.filterTagsToDelete(matchingEntries, tagsToCheck);

    await this.tagRepository.bulkDelete({ idStory, type: TagTypes.SEGMENT, name: In(tagsToDelete) });
  }

  private filterTagsToDelete<T extends TEntryToFilter>(entries: T[], tagsToCheck: string[]): string[] {
    const uniqueMathchingTagNames = Array.from(new Set(entries.flatMap((segment) => segment.tags)));

    if (tagsToCheck.length === uniqueMathchingTagNames.length) return [];

    const tagsToDelete = tagsToCheck.filter((tag) => !uniqueMathchingTagNames.includes(tag));

    return tagsToDelete;
  }
}
