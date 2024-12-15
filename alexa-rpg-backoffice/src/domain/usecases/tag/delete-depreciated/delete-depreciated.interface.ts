import { TagTypes } from '@src/enums';

export interface IDeleteDepreciatedTagUseCase {
  execute(idStory: string, tagsToCheck: string[], type: TagTypes): Promise<void>;
}
