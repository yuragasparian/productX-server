import type { Response } from "express";
import type { ProductAddRequest } from "@/types/express/requests";
import errorHandler from "@/handlers/error";
import type { ProductWithHistory, ProductFormData } from "@/types/products";
import prisma from "@/utils/prisma-client";
import successHandler from "@/handlers/success";
import { Prisma } from "@prisma/client";

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
    successHandler<ProductWithHistory>(res, newProduct);
  } catch (err) {
    // ahndling unique sku error
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        errorHandler(res, 4091);
      }
    }
    errorHandler(res, 5000);
  }
};

export default addProduct;
