import type { Response } from "express";
import type { ProductAddRequest } from "@/types/express/requests";
import type { ProductFormData } from "@/types/products";
import errorHandler from "@/handlers/error";
import successHandler from "@/handlers/success";
import prisma from "@/utils/prisma-client";
import { PrismaClientKnownRequestError } from "@/prisma/client/runtime/library";

const addProduct = async (
  req: ProductAddRequest<ProductFormData>,
  res: Response
) => {
  const product = req.body;
  const image = req.file?.filename;
  const creatorId = req.userId;

  product.image = image || "no-product-image.jpg";
  product.creatorId = creatorId;

  try {
    const newProduct = await prisma.product.create({
      data: {
        ...product,
        history: {
          create: {
            changeDescription: "Product has been created.",
          },
        },
      },
      include: {
        history: true,
      },
    });
    successHandler(res, { item: newProduct });
  } catch (err: unknown) {
    // ahndling unique sku error
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return errorHandler(res, 4091);
      }
    }
    errorHandler(res, 5000);
  }
};

export default addProduct;
