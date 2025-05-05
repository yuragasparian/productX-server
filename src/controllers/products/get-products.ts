import type { ProductsResponse } from "@/types/express/response";
import type { Request, Response } from "express";
import type { Prisma } from "@/prisma/client";
import prisma from "@/utils/prisma-client";
import successHandler from "@/handlers/success";

// add type
const statusFilter = {
  out_of_stock: { stockQuantity: { equals: 0 } },
  low_stock: { stockQuantity: { lt: 20 } },
  in_stock: { stockQuantity: { gte: 20 } },
} as const;

export async function getProducts(
  req: Request,
  res: Response<ProductsResponse>
) {
  const userId = req.userId;
  const page = Number(req.query.page as string) || 1;
  const rows_per_page = Number(req.query.rows_per_page as string) || 6;
  const { query, status } = req.query;

  const filters: Prisma.ProductWhereInput = {
    creatorId: userId,
  };

  // Add status filter if valid
  if (status && typeof status === "string" && status in statusFilter) {
    Object.assign(filters, statusFilter[status as keyof typeof statusFilter]);
  }

  // Add search query filter if provided
  if (query && typeof query === "string") {
    filters.name = {
      contains: query,
    };
  }

  const offset = (page - 1) * rows_per_page;

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where: filters,
      include: { history: true },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: rows_per_page,
    }),
    prisma.product.count({
      where: filters,
    }),
  ]);

  // Fetching the products with filters, pagination, and sorting

  const pages = Math.ceil(count / rows_per_page);

  successHandler(res, { items: products, pages });
}
