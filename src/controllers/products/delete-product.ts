import errorHandler from "@/handlers/error";
import successHandler from "@/handlers/success";
import { ProductUpdateRequest } from "@/types/express/requests";
import prisma from "@/utils/prisma-client";
import { Product } from "@prisma/client";
import type { Response } from "express";

const deleteProduct = async (req: ProductUpdateRequest, res: Response) => {
  const { id } = req.existingProduct as Product;

  try {
    await prisma.product
      .delete({
        where: { id },
      })
      .then(() => {
        successHandler(res, { item: id });
      });
  } catch (err) {
    errorHandler(res, 5000);
  }
};

export default deleteProduct;
