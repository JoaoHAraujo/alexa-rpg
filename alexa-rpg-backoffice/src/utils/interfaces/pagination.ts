export type TPagination<T> = {
  rows: T[];
  pagination: {
    totalRows: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
