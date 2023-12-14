const StoryTypes = {
  CreateStoryUseCase: 'CreateStoryUseCase',
  GetStoryByIdUseCase: 'GetStoryByIdUseCase',
};

const RepositoryTypes = {
  StoryRepository: 'StoryRepository',
};

export const TYPES = {
  usecases: { ...StoryTypes },
  repositories: { ...RepositoryTypes },
};
