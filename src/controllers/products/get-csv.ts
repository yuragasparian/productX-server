import errorHandler from "@/handlers/error";
import prisma from "@/utils/prisma-client";
import type { Request, Response } from "express";
import { Parser } from "json2csv";

export async function exportProductsCSV(req: Request, res: Response) {
  const { userId } = req;
  try {
    const products = await prisma.product.findMany({
      where: { creatorId: userId },
    });
    const fields = Array.from(Object.keys(products[0]));
    const parser = new Parser({ fields });
    const csv = parser.parse(products);

    res.header("Content-Type", "text/csv");
    res.attachment("products.csv");
    res.send(csv);
  } catch {
    errorHandler(res, 4042);
  }
}
