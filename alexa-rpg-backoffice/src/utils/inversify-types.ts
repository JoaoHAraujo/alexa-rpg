const StoryUseCaseTypes = {
  CreateStoryUseCase: 'CreateStoryUseCase',
  GetStoryByIdUseCase: 'GetStoryByIdUseCase',
  GetRandomStoriesUseCase: 'GetRandomStoriesUseCase',
  DeleteStoryUseCase: 'DeleteStoryUseCase',
};

const RepositoryTypes = {
  StoryRepository: 'StoryRepository',
};

export const TYPES = {
  usecases: { ...StoryUseCaseTypes },
  repositories: { ...RepositoryTypes },
};
