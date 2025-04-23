import errorHandler from "@/handlers/error";
import { ProductUpdateRequest } from "@/types/express/requests";
import prisma from "@/utils/prisma-client";
import { NextFunction, Response } from "express";

const verifyProductOwnership = async (
  req: ProductUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.parsedParams?.id;
  const creatorId = req.userId;
  try {
    const existingProduct = await prisma.product.findUniqueOrThrow({
      where: { id, creatorId },
    });
    req.existingProduct = existingProduct;
    next();
  } catch {
    return errorHandler(res, 404);
  }
};

export default verifyProductOwnership;
