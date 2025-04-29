import { Response, NextFunction } from "express";
import errorHandler from "@/handlers/error";
import { ProductAddRequest } from "@/types/express/requests";
import productUpdateSchema from "@/validators/schemas/product-update";
import { ProductFormData } from "@/types/products";
import productAddSchema from "../schemas/product-add";

const validateProductAdd = [
  async (
    req: ProductAddRequest<ProductFormData>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = productAddSchema.parse(req.body);
      req.body = result as ProductFormData;
      next();
    } catch {
      return errorHandler(res, 4220);
    }
  },
];

export default validateProductAdd;
