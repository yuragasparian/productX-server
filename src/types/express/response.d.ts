export type Meta = {
  status: number;
  error: string | null;
};

export type BaseResponse<T> = {
  meta: Meta;
  data: T;
};

export type Paginated<T> = {
  pages: number;
  items: T[];
};
