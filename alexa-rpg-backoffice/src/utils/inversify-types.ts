const StoryUseCaseTypes = {
  // Action
  CreateActionUseCase: 'CreateActionUseCase',

  // Segment
  CreateSegmentUseCase: 'CreateSegmentUseCase',
  DeleteSegmentUseCase: 'DeleteSegmentUseCase',
  GetSegmentByIdUseCase: 'GetSegmentByIdUseCase',
  MakeSegmentFirstUseCase: 'MakeSegmentFirstUseCase',
  UpdateSegmentUseCase: 'UpdateSegmentUseCase',

  // Story
  CreateStoryUseCase: 'CreateStoryUseCase',
  DeleteStoryUseCase: 'DeleteStoryUseCase',
  GetStoryByIdUseCase: 'GetStoryByIdUseCase',
  GetRandomStoriesUseCase: 'GetRandomStoriesUseCase',
  UpdateStoryUseCase: 'UpdateStoryUseCase',
};

const RepositoryTypes = {
  StoryRepository: 'StoryRepository',
  SegmentRepository: 'SegmentRepository',
  ActionRepository: 'ActionRepository',
};

export const TYPES = {
  usecases: { ...StoryUseCaseTypes },
  repositories: { ...RepositoryTypes },
};
