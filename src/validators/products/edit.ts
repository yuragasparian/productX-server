import { Response, NextFunction } from "express";
import errorHandler from "@/handlers/error";
import { ProductUpdateRequest } from "@/types/express/requests";
import productUpdateSchema from "@/validators/schemas/product-update";

const validateProductEdit = (
  req: ProductUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = productUpdateSchema.parse(req.body);
    req.body = result;
    next();
  } catch {
    return errorHandler(res, 4221);
  }
};

export default validateProductEdit;
