const StoryUseCaseTypes = {
  // Segment
  CreateSegmentUseCase: 'CreateSegmentUseCase',
  DeleteSegmentUseCase: 'DeleteSegmentUseCase',

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
};

export const TYPES = {
  usecases: { ...StoryUseCaseTypes },
  repositories: { ...RepositoryTypes },
};
