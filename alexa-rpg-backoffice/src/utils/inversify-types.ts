const StoryUseCaseTypes = {
  // Action
  CreateActionUseCase: 'CreateActionUseCase',
  DeleteActionUseCase: 'DeleteActionUseCase',
  GetSegmentActionsUseCase: 'GetSegmentActionsUseCase',
  GetActionByIdUseCase: 'GetActionByIdUseCase',
  SelectActionPaginationUseCase: 'SelectActionPaginationUseCase',
  UpdateActionUseCase: 'UpdateActionUseCase',

  // Segment
  CreateSegmentUseCase: 'CreateSegmentUseCase',
  DeleteSegmentUseCase: 'DeleteSegmentUseCase',
  GetSegmentByIdUseCase: 'GetSegmentByIdUseCase',
  MakeSegmentFirstUseCase: 'MakeSegmentFirstUseCase',
  SelectSegmentPaginationUseCase: 'SelectSegmentPaginationUseCase',
  UpdateSegmentUseCase: 'UpdateSegmentUseCase',

  // Story
  CreateStoryUseCase: 'CreateStoryUseCase',
  DeleteStoryUseCase: 'DeleteStoryUseCase',
  GetStoryByIdUseCase: 'GetStoryByIdUseCase',
  GetRandomStoriesUseCase: 'GetRandomStoriesUseCase',
  UpdateStoryUseCase: 'UpdateStoryUseCase',

  // Tag
  CreateResultingTagUseCase: 'CreateResultingTagUseCase',
  DeleteDepreciatedTagUseCase: 'DeleteDepreciatedTagUseCase',
  SelectTagPaginationUseCase: 'SelectTagPaginationUseCase',
};

const RepositoryTypes = {
  ActionRepository: 'ActionRepository',
  SegmentRepository: 'SegmentRepository',
  StoryRepository: 'StoryRepository',
  TagRepository: 'TagRepository',
};

export const TYPES = {
  usecases: { ...StoryUseCaseTypes },
  repositories: { ...RepositoryTypes },
};
