const StoryUseCaseTypes = {
  CreateStoryUseCase: 'CreateStoryUseCase',
  GetStoryByIdUseCase: 'GetStoryByIdUseCase',
  GetRandomStoriesUseCase: 'GetRandomStoriesUseCase',
};

const RepositoryTypes = {
  StoryRepository: 'StoryRepository',
};

export const TYPES = {
  usecases: { ...StoryUseCaseTypes },
  repositories: { ...RepositoryTypes },
};
