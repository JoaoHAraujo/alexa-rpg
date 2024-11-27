const StoryUseCaseTypes = {
  CreateStoryUseCase: 'CreateStoryUseCase',
  DeleteStoryUseCase: 'DeleteStoryUseCase',
  GetStoryByIdUseCase: 'GetStoryByIdUseCase',
  GetRandomStoriesUseCase: 'GetRandomStoriesUseCase',
  UpdateStoryUseCase: 'UpdateStoryUseCase',
};

const RepositoryTypes = {
  StoryRepository: 'StoryRepository',
};

export const TYPES = {
  usecases: { ...StoryUseCaseTypes },
  repositories: { ...RepositoryTypes },
};
