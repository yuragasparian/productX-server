import type { Prisma, ProductCategory } from "@/prisma/client";

export type ProductFormData = {
  name: string;
  sku: number;
  price: number;
  category: ProductCategory;
  stockQuantity: number;
  image: string;
  description: string;
  creatorId: number;
};

export type StringProductFormData = { [K in keyof ProductFormData]: string };

export type ProductWithHistory = Prisma.ProductGetPayload<{
  include: { history: true };
}>;
