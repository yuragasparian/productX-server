import type { Response } from "express";
import type { ProductUpdateRequest } from "@/types/express/requests";
import errorHandler from "@/handlers/error";
import prisma from "@/utils/prisma-client";
import successHandler from "@/handlers/success";
import type { ProductWithHistory } from "@/types/products";
import { Prisma, Product } from "@prisma/client";
import { typedKeys } from "@/utils/utils";

const editProduct = async (req: ProductUpdateRequest, res: Response) => {
  const existingProduct = req.existingProduct as Product;
  const product = req.body;
  const image = req.file?.filename;

  product.image = image;

  try {
    //detecting if field actualy changed + generating change history, excluding image field
    // --issue-- when field exists but is the same as in database, it still being updated
    const changes: string[] = [];
    for (const key of typedKeys(product)) {
      if (key === "image") continue;

      if (product[key] !== existingProduct[key]) {
        changes.push(
          `Field '${key}' changed from '${existingProduct[key]}' to '${product[key]}'`
        );
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: existingProduct.id },
      data: {
        ...product,
        history: {
          create: changes.map((changeDescription) => ({
            changeDescription,
          })),
        },
      },
      include: {
        history: true,
      },
    });

    successHandler<ProductWithHistory>(res, updatedProduct);
  } catch (err) {
    // hndling unique sku error
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        errorHandler(res, 4091);
      }
    }
    errorHandler(res, 5000);
  }
};

export default editProduct;
