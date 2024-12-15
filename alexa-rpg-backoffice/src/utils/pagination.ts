import { TPagination } from './interfaces/pagination';

type TFormatPaginationInput<T> = { rows: T[]; totalRows: number; currentPage: number; pageSize: number };

export function formatPagination<T>(data: TFormatPaginationInput<T>): TPagination<T> {
  const totalPages = Math.ceil(data.totalRows / data.pageSize);

  return {
    rows: data.rows,
    pagination: {
      totalPages,
      totalRows: data.totalRows,
      page: data.currentPage,
      pageSize: data.pageSize,
      hasNextPage: !!(data.currentPage < totalPages && totalPages),
      hasPreviousPage: !!(totalPages && data.currentPage > 1),
    },
  };
}

export type TPaginationParams<T> = {
  page: number;
  pageSize: number;
  order?: { orderBy: keyof T; isDesc: 'true' | 'false' };
};

enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

type TPaginationOptions = {
  skip: number;
  take: number;
  order?: {
    [x: string]: OrderType;
  };
};

export function makePagination<T>(params: TPaginationParams<T>): TPaginationOptions {
  const { page = 1, pageSize = 30, order } = params;

  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
    ...(order && {
      order: { [order.orderBy ?? 'createdAt']: order.isDesc === 'true' ? OrderType.DESC : OrderType.ASC },
    }),
  };
}
