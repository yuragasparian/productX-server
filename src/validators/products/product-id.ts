import { Request, Response, NextFunction } from "express";
import errorHandler from "@/handlers/error";
import { ProductUpdateRequest } from "@/types/express/requests";
import idParamSchema from "../schemas/id-param";

const validateIdParam = (
  req: ProductUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = idParamSchema.parse(req.params);
    req.parsedParams = { id: result.id };
    next();
  } catch {
    errorHandler(res, 4012);
  }
};

export default validateIdParam;
