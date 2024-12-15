import { TTagModel } from '@src/domain/models';
import { TagTypes } from '@src/enums';

export interface ICreateResultingTagUseCase {
  execute(idStory: string, tagsToCheck: string[], type: TagTypes): Promise<TTagModel[]>;
}
