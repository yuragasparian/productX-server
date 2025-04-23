import errorHandler from "@/handlers/error";
import { ProductUpdateRequest } from "@/types/express/requests";
import { NextFunction, Response } from "express";
import { z } from "zod";

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(), // coerce from string to number
});

const validateIdParam = async (
  req: ProductUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  const result = idParamSchema.safeParse(req.params);
  if (!result.success) {
    return errorHandler(res, 404);
  }
  req.parsedParams = { id: result.data.id };
  next();
};

export default validateIdParam;
