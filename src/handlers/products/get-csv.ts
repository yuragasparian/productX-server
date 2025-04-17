import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Parser } from "json2csv";

const prisma = new PrismaClient();

export async function exportProductsCSV(req: Request, res: Response) {
  const products = await prisma.products.findMany();

  const fields = Array.from(Object.keys(products[0]));
  const parser = new Parser({ fields });
  const csv = parser.parse(products);

  res.header("Content-Type", "text/csv");
  res.attachment("products.csv");
  res.send(csv);
  return 
}
