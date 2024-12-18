export type TEntitiesWithTags = 'segment' | 'action';

export enum TagTypes {
  SEGMENT = 'SEGMENT',
  ACTION = 'ACTION',
}

export const MapTagTypeToEntity = new Map<TagTypes, TEntitiesWithTags>([
  [TagTypes.ACTION, 'action'],
  [TagTypes.SEGMENT, 'segment'],
]);
