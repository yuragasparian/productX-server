import { Request, Response } from "express";
import { Prisma, PrismaClient, Products } from '@prisma/client';
import imageActualPath from './../../services/image-actual-path';

type ReturnType = {
  products: Products[];
  totalProducts: number;
};

export async function getProducts(req: Request, res: Response<ReturnType>) {
  const userId = req.userId;
  const page = parseInt(req.query.page as string) || 1;
  const { query, status } = req.query;

  const pageSize = 10; // rowsPerPage
  const prisma = new PrismaClient();

  const statusFilter = {
    out_of_stock: { stock_quantity: { equals: 0 } },
    low_stock: { stock_quantity: { lt: 20 } },
    in_stock: { stock_quantity: { gte: 20 } },
  } as const;

  const filters: Prisma.ProductsWhereInput = {
    adder_id: userId,
   
  };

  // Add status filter if valid
  if (status && typeof status === "string" && status in statusFilter) {
    Object.assign(filters, statusFilter[status as keyof typeof statusFilter]);
  }

  // Add search query filter
  if (query && typeof query === "string") {
    filters.name = {
      contains: query
    };
  }

  const products = await prisma.products.findMany({
    where: filters,
    include: { history: true },
    orderBy: { add_date: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalProducts = await prisma.products.count({
    where: filters,
  });

  res.status(200).json({ products: imageActualPath(products), totalProducts });
}
