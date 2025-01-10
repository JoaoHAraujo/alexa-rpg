const StoryUseCaseTypes = {
  CreateStoryUseCase: 'CreateStoryUseCase',
  DeleteStoryUseCase: 'DeleteStoryUseCase',
  GetStoryByIdUseCase: 'GetStoryByIdUseCase',
  GetRandomStoriesUseCase: 'GetRandomStoriesUseCase',
  UpdateStoryUseCase: 'UpdateStoryUseCase',
};

const ActionUseCaseTypes = {
  CreateActionUseCase: 'CreateActionUseCase',
  DeleteActionUseCase: 'DeleteActionUseCase',
  GetSegmentActionsUseCase: 'GetSegmentActionsUseCase',
  GetActionByIdUseCase: 'GetActionByIdUseCase',
  SelectActionPaginationUseCase: 'SelectActionPaginationUseCase',
  UpdateActionUseCase: 'UpdateActionUseCase',
};

const AdminUseCaseTypes = {
  CreateAdminUseCase: 'CreateAdminUseCase',
  DeleteAdminUseCase: 'DeleteAdminUseCase',
  GetAdminByIdUseCase: 'GetAdminByIdUseCase',
  LoginUseCase: 'LoginUseCase',
  SelectAdminPaginationUseCase: 'SelectAdminPaginationUseCase',
  UpdateAdminUseCase: 'UpdateAdminUseCase',
};

const SegmentUseCaseTypes = {
  CreateSegmentUseCase: 'CreateSegmentUseCase',
  DeleteSegmentUseCase: 'DeleteSegmentUseCase',
  GetSegmentByIdUseCase: 'GetSegmentByIdUseCase',
  MakeSegmentFirstUseCase: 'MakeSegmentFirstUseCase',
  SelectSegmentPaginationUseCase: 'SelectSegmentPaginationUseCase',
  UpdateSegmentUseCase: 'UpdateSegmentUseCase',
};

const TagUseCaseTypes = {
  CreateResultingTagUseCase: 'CreateResultingTagUseCase',
  DeleteDepreciatedTagUseCase: 'DeleteDepreciatedTagUseCase',
  SelectTagPaginationUseCase: 'SelectTagPaginationUseCase',
};

const UserProgressUseCaseTypes = {
  SelectUserProgressesUseCase: 'SelectUserProgressesUseCase',
};

const RepositoryTypes = {
  ActionRepository: 'ActionRepository',
  AdminRepository: 'AdminRepository',
  SegmentRepository: 'SegmentRepository',
  StoryRepository: 'StoryRepository',
  TagRepository: 'TagRepository',
  UserProgressRepository: 'UserProgressRepository',
};

const Adapters = {
  CryptoAdapter: 'CryptoAdapter',
  JwtAdapter: 'JwtAdapter',
};

export const TYPES = {
  adapters: { ...Adapters },
  repositories: { ...RepositoryTypes },
  usecases: {
    ...StoryUseCaseTypes,
    ...ActionUseCaseTypes,
    ...AdminUseCaseTypes,
    ...SegmentUseCaseTypes,
    ...TagUseCaseTypes,
    ...UserProgressUseCaseTypes,
  },
};
