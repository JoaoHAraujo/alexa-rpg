const StoryUseCaseTypes = {
  // Action
  CreateActionUseCase: 'CreateActionUseCase',
  DeleteActionUseCase: 'DeleteActionUseCase',
  GetSegmentActionsUseCase: 'GetSegmentActionsUseCase',
  GetActionByIdUseCase: 'GetActionByIdUseCase',
  SelectActionPaginationUseCase: 'SelectActionPaginationUseCase',
  UpdateActionUseCase: 'UpdateActionUseCase',

  // Admin
  CreateAdminUseCase: 'CreateAdminUseCase',
  GetAdminByIdUseCase: 'GetAdminByIdUseCase',

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
  AdminRepository: 'AdminRepository',
  SegmentRepository: 'SegmentRepository',
  StoryRepository: 'StoryRepository',
  TagRepository: 'TagRepository',
};

const Adapters = {
  CryptoAdapter: 'CryptoAdapter',
};

export const TYPES = {
  adapters: { ...Adapters },
  usecases: { ...StoryUseCaseTypes },
  repositories: { ...RepositoryTypes },
};
