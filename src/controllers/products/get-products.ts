import type { ProductsResponse } from "@/types/express/response";
import type { Request, Response } from "express";
import type { Prisma } from "@prisma/client";
import prisma from "@/utils/prisma-client";
import successHandler from "@/handlers/success";

const statusFilter = {
  out_of_stock: { stock_quantity: { equals: 0 } },
  low_stock: { stock_quantity: { lt: 20 } },
  in_stock: { stock_quantity: { gte: 20 } },
} as const;

export async function getProducts(
  req: Request,
  res: Response<ProductsResponse>
) {
  const userId = req.userId;
  const page = Number(req.query.page as string) || 1;
  const rows_per_page = Number(req.query.rows_per_page as string) || 10;
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

  // Fetching the products with filters, pagination, and sorting
  const products = await prisma.product.findMany({
    where: filters,
    include: { history: true },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * rows_per_page,
    take: rows_per_page,
  });

  const totalProducts = await prisma.product.count({
    where: filters,
  });

  const pages = Math.ceil(totalProducts / rows_per_page);

  successHandler(res, { items: products, pages });
}
