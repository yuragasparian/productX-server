import type { Prisma, ProductCategory } from "@prisma/client";

export type ProductFormData = {
  name: string;
  sku: number;
  description: string;
  price: number;
  stockQuantity: number;
  image: string;
  creatorId: number;
  category: ProductCategory;
};

export type StringProductFormData = { [K in keyof ProductFormData]: string };

export type ProductWithHistory = Prisma.ProductGetPayload<{
  include: { history: true };
}>;
