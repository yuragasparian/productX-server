import type { Product } from "@prisma/client";

type Meta = {
  status: number;
  error: string | null;
};

type Paginated<T> = {
  pages: number;
  items: T[];
};

export type ProductsResponse = {
  data: Paginated<Product>;
};

export type ErrorResponse = {
  meta: Meta;
  data: null;
};

export type AuthResponse = {
  token: string;
};
