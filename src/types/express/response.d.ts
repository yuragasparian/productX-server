import type { Product } from "@/prisma/client";

type Meta = {
  error: {
    code: number;
    message: string;
  } | null;
  status: number;
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
