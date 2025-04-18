import { BaseResponse, Paginated } from "../types/express/response";


export const createResponse = <T>(
  data: T,
  status = 200,
  error: string | null = null
): BaseResponse<T> => ({
  meta: { status, error },
  data,
});

export const createPaginatedResponse = <T>(
  items: T[],
  pages: number,
  status = 200,
  error: string | null = null
): BaseResponse<Paginated<T>> => ({
  meta: { status, error },
  data: {
    pages,
    items,
  },
});
